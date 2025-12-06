#!/usr/bin/env python3
"""
VBV CHECKER - Validador Profissional de Parâmetros VBV para Instagram Reels
Versão: 1.1.0 (com Export JSON)

Objetivo: Zero recompressão, qualidade premium, nitidez máxima
Arquitetura: Python Gera → Dashboard Exibe
"""

import argparse
import json
import sys
from dataclasses import dataclass, asdict
from datetime import datetime, timezone
from typing import Optional

# ══════════════════════════════════════════════════════════════════════════════
# CONSTANTES
# ══════════════════════════════════════════════════════════════════════════════

VERSION = "1.1.0"

INSTAGRAM_LIMITS = {
    "max_bitrate_safe": 12000,      # kbps - limite seguro sem recompressão
    "max_bitrate_absolute": 15000,  # kbps - limite máximo aceito
    "internal_processing": 5500,    # kbps - bitrate interno do Instagram
    "max_file_size_mb": 650,        # MB - limite para Reels < 10min
    "recommended_resolution": "1080x1920",
    "recommended_fps": 30,
    "codec": "H.264 High Profile",
}

PRESETS = {
    "maximum": {
        "name": "Maximum Quality",
        "description": "Reels até 30s - Qualidade máxima",
        "target": 10000,
        "maxrate": 11200,
        "bufsize": 15000,
        "vbv_init": 0.85,
    },
    "safe": {
        "name": "Safe Premium",
        "description": "Reels > 40s - Segurança + Qualidade",
        "target": 8000,
        "maxrate": 9000,
        "bufsize": 12500,
        "vbv_init": 0.85,
    },
}

# ══════════════════════════════════════════════════════════════════════════════
# CORES ANSI PARA TERMINAL
# ══════════════════════════════════════════════════════════════════════════════

class Colors:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    RED = "\033[91m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    MAGENTA = "\033[95m"
    CYAN = "\033[96m"
    WHITE = "\033[97m"
    
    @staticmethod
    def ok(text: str) -> str:
        return f"{Colors.GREEN}✓ {text}{Colors.RESET}"
    
    @staticmethod
    def warn(text: str) -> str:
        return f"{Colors.YELLOW}⚠ {text}{Colors.RESET}"
    
    @staticmethod
    def fail(text: str) -> str:
        return f"{Colors.RED}✗ {text}{Colors.RESET}"
    
    @staticmethod
    def header(text: str) -> str:
        return f"{Colors.BOLD}{Colors.CYAN}{text}{Colors.RESET}"
    
    @staticmethod
    def value(text: str) -> str:
        return f"{Colors.BOLD}{Colors.WHITE}{text}{Colors.RESET}"

# ══════════════════════════════════════════════════════════════════════════════
# DATA CLASSES
# ══════════════════════════════════════════════════════════════════════════════

@dataclass
class VBVParams:
    """Parâmetros VBV para encoding x264."""
    target: int       # bitrate target (kbps)
    maxrate: int      # vbv-maxrate (kbps)
    bufsize: int      # vbv-bufsize (kbps)
    vbv_init: float   # vbv-init (0.0-1.0)
    
    def __post_init__(self):
        if not 0.0 <= self.vbv_init <= 1.0:
            raise ValueError("vbv_init deve estar entre 0.0 e 1.0")
        if self.target <= 0 or self.maxrate <= 0 or self.bufsize <= 0:
            raise ValueError("Bitrates devem ser positivos")

@dataclass
class ValidationResult:
    """Resultado de uma validação individual."""
    name: str
    status: str  # "OK", "WARN", "FAIL"
    detail: str
    value: Optional[float] = None

# ══════════════════════════════════════════════════════════════════════════════
# CLASSE PRINCIPAL: VBV ANALYZER
# ══════════════════════════════════════════════════════════════════════════════

class VBVAnalyzer:
    """Analisador profissional de parâmetros VBV para Instagram Reels."""
    
    def __init__(self, params: VBVParams, preset_name: str = None):
        self.params = params
        self.preset_name = preset_name
        self.validations: list[ValidationResult] = []
        self.calculations: dict = {}
        self.instagram_analysis: dict = {}
    
    def analyze(self) -> dict:
        """Executa análise completa e retorna resultados estruturados."""
        self._calculate_metrics()
        self._run_validations()
        self._analyze_instagram()
        
        return {
            "params": asdict(self.params),
            "calculations": self.calculations,
            "instagram_analysis": self.instagram_analysis,
            "validations": [asdict(v) for v in self.validations],
            "overall_status": self._get_overall_status(),
            "score": self._calculate_score(),
        }
    
    def _calculate_metrics(self):
        """Calcula métricas derivadas dos parâmetros."""
        p = self.params
        
        self.calculations = {
            "buffer_inicial": int(p.bufsize * p.vbv_init),
            "ratio_bufsize_maxrate": round(p.bufsize / p.maxrate, 2),
            "ratio_maxrate_target": round(p.maxrate / p.target, 2),
            "margem_inicial": int(p.bufsize * p.vbv_init - p.target),
            "headroom_percent": round((p.maxrate / p.target - 1) * 100, 1),
        }
    
    def _run_validations(self):
        """Executa as 8 validações profissionais."""
        self.validations = []
        
        # 1. Regra de Ouro (bufsize/maxrate entre 1.2x-1.5x)
        ratio = self.calculations["ratio_bufsize_maxrate"]
        if 1.2 <= ratio <= 1.5:
            status, detail = "OK", f"{ratio}x está entre 1.2x-1.5x"
        elif 1.0 <= ratio < 1.2 or 1.5 < ratio <= 2.0:
            status, detail = "WARN", f"{ratio}x fora do ideal (1.2x-1.5x)"
        else:
            status, detail = "FAIL", f"{ratio}x muito fora do padrão"
        self.validations.append(ValidationResult(
            "Regra de Ouro (bufsize/maxrate)", status, detail, ratio
        ))
        
        # 2. Hierarquia (target < maxrate < bufsize)
        p = self.params
        if p.target < p.maxrate < p.bufsize:
            status, detail = "OK", f"{p.target} < {p.maxrate} < {p.bufsize}"
        else:
            status, detail = "FAIL", "Hierarquia incorreta"
        self.validations.append(ValidationResult(
            "Hierarquia (target < maxrate < bufsize)", status, detail, None
        ))
        
        # 3. Headroom maxrate/target (10-25% ideal)
        headroom = self.calculations["headroom_percent"]
        if 10 <= headroom <= 25:
            status, detail = "OK", f"+{headroom}% (ideal: 10-25%)"
        elif 5 <= headroom < 10 or 25 < headroom <= 30:
            status, detail = "WARN", f"+{headroom}% (fora do ideal 10-25%)"
        else:
            status, detail = "FAIL", f"+{headroom}% (muito fora do padrão)"
        self.validations.append(ValidationResult(
            "Headroom maxrate/target", status, detail, headroom
        ))
        
        # 4. VBV-Init (80-90% recomendado)
        vbv_init_pct = self.params.vbv_init * 100
        if 80 <= vbv_init_pct <= 90:
            status, detail = "OK", f"{vbv_init_pct:.0f}% (recomendado: 80-90%)"
        elif 70 <= vbv_init_pct < 80 or 90 < vbv_init_pct <= 100:
            status, detail = "WARN", f"{vbv_init_pct:.0f}% (fora do ideal 80-90%)"
        else:
            status, detail = "FAIL", f"{vbv_init_pct:.0f}% (muito baixo)"
        self.validations.append(ValidationResult(
            "VBV-Init", status, detail, self.params.vbv_init
        ))
        
        # 5. Margem Inicial (buffer_inicial - target)
        margem = self.calculations["margem_inicial"]
        if margem > 0:
            status, detail = "OK", f"+{margem} kbps de folga"
        else:
            status, detail = "WARN", f"{margem} kbps (sem margem)"
        self.validations.append(ValidationResult(
            "Margem Inicial", status, detail, margem
        ))
        
        # 6. Sustentação de Pico (buffer drain time)
        buffer_drain_time = self._calculate_buffer_drain_time()
        if buffer_drain_time >= 3:
            status, detail = "OK", f"{buffer_drain_time:.1f}s de pico contínuo suportado"
        elif 2 <= buffer_drain_time < 3:
            status, detail = "WARN", f"{buffer_drain_time:.1f}s de pico (ideal: ≥3s)"
        else:
            status, detail = "FAIL", f"{buffer_drain_time:.1f}s (muito curto)"
        self.validations.append(ValidationResult(
            "Sustentação de Pico", status, detail, round(buffer_drain_time, 1)
        ))
        
        # 7. Limite Instagram (maxrate ≤ 12000 seguro)
        maxrate = self.params.maxrate
        ig_safe = INSTAGRAM_LIMITS["max_bitrate_safe"]
        ig_max = INSTAGRAM_LIMITS["max_bitrate_absolute"]
        if maxrate <= ig_safe:
            status, detail = "OK", f"{maxrate} kbps ≤ {ig_safe} kbps (seguro)"
        elif ig_safe < maxrate <= ig_max:
            status, detail = "WARN", f"{maxrate} kbps entre {ig_safe}-{ig_max} kbps"
        else:
            status, detail = "FAIL", f"{maxrate} kbps > {ig_max} kbps (risco de recompressão)"
        self.validations.append(ValidationResult(
            "Limite Instagram", status, detail, maxrate
        ))
        
        # 8. Margem vs Instagram (target vs internal_processing)
        ig_internal = INSTAGRAM_LIMITS["internal_processing"]
        margem_ig = ((self.params.target / ig_internal) - 1) * 100
        if margem_ig >= 40:
            status, detail = "OK", f"+{margem_ig:.0f}% acima do processing interno ({ig_internal} kbps)"
        elif 0 <= margem_ig < 40:
            status, detail = "WARN", f"+{margem_ig:.0f}% (ideal: ≥40%)"
        else:
            status, detail = "FAIL", f"{margem_ig:.0f}% (abaixo do processing interno)"
        self.validations.append(ValidationResult(
            "Margem vs Instagram", status, detail, round(margem_ig, 1)
        ))
    
    def _calculate_buffer_drain_time(self) -> float:
        """Calcula tempo que o buffer aguenta em pico máximo."""
        buffer_inicial = self.calculations["buffer_inicial"]
        drain_rate = self.params.maxrate - self.params.target
        if drain_rate <= 0:
            return 0
        return buffer_inicial / drain_rate
    
    def _analyze_instagram(self):
        """Análise específica para Instagram Reels."""
        p = self.params
        buffer_drain = self._calculate_buffer_drain_time()
        
        # Peak absorption time (quanto tempo para absorver um pico)
        peak_absorption = (p.bufsize - self.calculations["buffer_inicial"]) / p.maxrate
        
        # Recovery time (tempo para buffer recuperar após drain)
        recovery = (p.bufsize - p.target) / (p.bufsize - p.maxrate) if p.bufsize > p.maxrate else 0
        
        # Headroom vs Instagram internal
        headroom_vs_ig = p.target - INSTAGRAM_LIMITS["internal_processing"]
        quality_margin = (headroom_vs_ig / INSTAGRAM_LIMITS["internal_processing"]) * 100
        
        # Estimativas de tamanho de arquivo
        target_mbps = p.target / 1000 / 8  # kbps -> MB/s
        
        self.instagram_analysis = {
            "buffer_drain_time_sec": round(buffer_drain, 1),
            "peak_absorption_sec": round(peak_absorption, 2),
            "recovery_time_sec": round(max(0, recovery), 2),
            "headroom_vs_instagram": headroom_vs_ig,
            "quality_margin_percent": round(quality_margin, 1),
            "estimated_size_30s_mb": round(target_mbps * 30, 1),
            "estimated_size_60s_mb": round(target_mbps * 60, 1),
            "estimated_size_90s_mb": round(target_mbps * 90, 1),
        }
    
    def _get_overall_status(self) -> str:
        """Retorna status geral baseado nas validações."""
        statuses = [v.status for v in self.validations]
        if "FAIL" in statuses:
            return "FAIL"
        elif "WARN" in statuses:
            return "WARN"
        return "OK"
    
    def _calculate_score(self) -> int:
        """Calcula score numérico (0-100) baseado nas 8 validações."""
        # OK = 12.5 pontos, WARN = 6.25 pontos, FAIL = 0 pontos
        score = 0
        points_per_validation = 100 / len(self.validations)
        
        for v in self.validations:
            if v.status == "OK":
                score += points_per_validation
            elif v.status == "WARN":
                score += points_per_validation / 2
        
        return int(round(score))
    
    def get_x264_params(self) -> list[str]:
        """Retorna parâmetros formatados para x264."""
        p = self.params
        return [
            f"bitrate={p.target}",
            f"vbv-maxrate={p.maxrate}",
            f"vbv-bufsize={p.bufsize}",
            f"vbv-init={p.vbv_init}",
        ]
    
    def get_ffmpeg_command(self) -> dict:
        """Retorna comandos FFmpeg 2-pass."""
        p = self.params
        common = f"-c:v libx264 -b:v {p.target}k -maxrate {p.maxrate}k -bufsize {p.bufsize}k -preset slow"
        return {
            "pass1": f"{common} -pass 1 -f null /dev/null",
            "pass2": f"{common} -pass 2 output.mp4",
        }
    
    def print_report(self):
        """Imprime relatório formatado no terminal."""
        p = self.params
        c = self.calculations
        ig = self.instagram_analysis
        
        print()
        print(Colors.header("═" * 60))
        print(Colors.header("  🎬 VBV CHECKER - Instagram Reels Validator"))
        print(Colors.header("═" * 60))
        
        # Preset info
        if self.preset_name:
            preset = PRESETS.get(self.preset_name, {})
            print(f"\n  📦 Preset: {Colors.value(preset.get('name', self.preset_name))}")
            print(f"     {preset.get('description', '')}")
        
        # Parâmetros
        print(Colors.header("\n  📊 PARÂMETROS VBV"))
        print(f"     Target:   {Colors.value(f'{p.target:,} kbps')}")
        print(f"     Maxrate:  {Colors.value(f'{p.maxrate:,} kbps')}")
        print(f"     Bufsize:  {Colors.value(f'{p.bufsize:,} kbps')}")
        print(f"     VBV-Init: {Colors.value(f'{p.vbv_init:.0%}')}")
        
        # Cálculos
        print(Colors.header("\n  🔢 CÁLCULOS"))
        print(f"     Buffer Inicial:      {Colors.value(str(c['buffer_inicial']) + ' kbps')}")
        print(f"     Ratio bufsize/max:   {Colors.value(str(c['ratio_bufsize_maxrate']) + 'x')}")
        print(f"     Ratio maxrate/tgt:   {Colors.value(str(c['ratio_maxrate_target']) + 'x')}")
        print(f"     Headroom:            {Colors.value('+' + str(c['headroom_percent']) + '%')}")
        print(f"     Margem Inicial:      {Colors.value('+' + str(c['margem_inicial']) + ' kbps')}")
        
        # Validações
        print(Colors.header("\n  ✅ VALIDAÇÕES"))
        for v in self.validations:
            if v.status == "OK":
                print(f"     {Colors.ok(v.name)}")
                print(f"        {v.detail}")
            elif v.status == "WARN":
                print(f"     {Colors.warn(v.name)}")
                print(f"        {v.detail}")
            else:
                print(f"     {Colors.fail(v.name)}")
                print(f"        {v.detail}")
        
        # Score
        score = self._calculate_score()
        status = self._get_overall_status()
        status_color = Colors.GREEN if status == "OK" else (Colors.YELLOW if status == "WARN" else Colors.RED)
        print(Colors.header("\n  🎯 RESULTADO"))
        print(f"     Score: {status_color}{Colors.BOLD}{score}/100{Colors.RESET}")
        print(f"     Status: {status_color}{Colors.BOLD}{status}{Colors.RESET}")
        
        # Análise Instagram
        print(Colors.header("\n  📱 ANÁLISE INSTAGRAM"))
        print(f"     Sustentação de Pico:   {Colors.value(str(ig['buffer_drain_time_sec']) + 's')}")
        print(f"     Absorção de Pico:      {Colors.value(str(ig['peak_absorption_sec']) + 's')}")
        print(f"     Margem vs IG interno:  {Colors.value('+' + str(ig['quality_margin_percent']) + '%')}")
        print(f"\n     📦 Tamanho estimado:")
        print(f"        30s: {Colors.value(str(ig['estimated_size_30s_mb']) + ' MB')}")
        print(f"        60s: {Colors.value(str(ig['estimated_size_60s_mb']) + ' MB')}")
        print(f"        90s: {Colors.value(str(ig['estimated_size_90s_mb']) + ' MB')}")
        
        # FFmpeg commands
        ffmpeg = self.get_ffmpeg_command()
        print(Colors.header("\n  🎬 COMANDOS FFMPEG (2-pass)"))
        print(f"     Pass 1:")
        print(f"     {Colors.CYAN}{ffmpeg['pass1']}{Colors.RESET}")
        print(f"     Pass 2:")
        print(f"     {Colors.CYAN}{ffmpeg['pass2']}{Colors.RESET}")
        
        # x264 params
        x264 = self.get_x264_params()
        print(Colors.header("\n  ⚙️ PARÂMETROS x264"))
        print(f"     {Colors.CYAN}:x264-params=\"{':'.join(x264)}\"{Colors.RESET}")
        
        print(Colors.header("\n" + "═" * 60))
        print()

# ══════════════════════════════════════════════════════════════════════════════
# EXPORT JSON
# ══════════════════════════════════════════════════════════════════════════════

def export_to_json(analyzer: VBVAnalyzer, filepath: str):
    """Exporta resultados da análise VBV para JSON."""
    results = analyzer.analyze()
    
    export_data = {
        "meta": {
            "version": VERSION,
            "generator": "vbv_checker.py",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "preset_used": analyzer.preset_name,
        },
        "params": results["params"],
        "calculations": results["calculations"],
        "instagram_analysis": results["instagram_analysis"],
        "validations": results["validations"],
        "overall_status": results["overall_status"],
        "score": results["score"],
        "x264_params": analyzer.get_x264_params(),
        "ffmpeg_command": analyzer.get_ffmpeg_command(),
    }
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(export_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n{Colors.ok(f'JSON exportado para: {filepath}')}")
    return export_data

# ══════════════════════════════════════════════════════════════════════════════
# FUNÇÕES AUXILIARES
# ══════════════════════════════════════════════════════════════════════════════

def recommend_preset(duration_seconds: int) -> str:
    """Recomenda preset baseado na duração do vídeo."""
    if duration_seconds <= 30:
        return "maximum"
    else:
        return "safe"

def list_presets():
    """Lista todos os presets disponíveis."""
    print(Colors.header("\n  📦 PRESETS DISPONÍVEIS"))
    print(Colors.header("  " + "─" * 50))
    
    for key, preset in PRESETS.items():
        print(f"\n  {Colors.BOLD}--preset {key}{Colors.RESET}")
        print(f"     Nome: {preset['name']}")
        print(f"     {preset['description']}")
        print(f"     Target:   {preset['target']:,} kbps")
        print(f"     Maxrate:  {preset['maxrate']:,} kbps")
        print(f"     Bufsize:  {preset['bufsize']:,} kbps")
        print(f"     VBV-Init: {preset['vbv_init']:.0%}")
    
    print()

# ══════════════════════════════════════════════════════════════════════════════
# CLI
# ══════════════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="🎬 VBV Checker - Validador de parâmetros VBV para Instagram Reels",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos de uso:
  %(prog)s --preset maximum              # Usa preset Maximum Quality (Reels ≤30s)
  %(prog)s --preset safe                 # Usa preset Safe Premium (Reels >40s)
  %(prog)s --preset maximum --export results.json   # Exporta para JSON
  %(prog)s --recommend 25                # Recomenda preset para vídeo de 25s
  %(prog)s 10000 11200 15000 0.85        # Valores customizados
  %(prog)s --presets                     # Lista todos os presets
        """
    )
    
    parser.add_argument('values', nargs='*', type=float,
                        help='target maxrate bufsize vbv_init (valores customizados)')
    parser.add_argument('--preset', '-p', choices=list(PRESETS.keys()),
                        help='Usar preset pré-definido')
    parser.add_argument('--presets', action='store_true',
                        help='Listar presets disponíveis')
    parser.add_argument('--recommend', '-r', type=int, metavar='SEGUNDOS',
                        help='Recomendar preset baseado na duração')
    parser.add_argument('--export', '-e', metavar='ARQUIVO.json',
                        help='Exportar resultados para JSON')
    parser.add_argument('--version', '-v', action='version', version=f'VBV Checker {VERSION}')
    
    args = parser.parse_args()
    
    # Listar presets
    if args.presets:
        list_presets()
        return
    
    # Recomendar preset
    if args.recommend:
        preset_key = recommend_preset(args.recommend)
        preset = PRESETS[preset_key]
        print(f"\n{Colors.ok(f'Para vídeo de {args.recommend}s, recomendo: --preset {preset_key}')}")
        print(f"   {preset['name']} - {preset['description']}")
        
        # Criar analyzer e mostrar relatório
        params = VBVParams(
            target=preset['target'],
            maxrate=preset['maxrate'],
            bufsize=preset['bufsize'],
            vbv_init=preset['vbv_init']
        )
        analyzer = VBVAnalyzer(params, preset_key)
        analyzer.analyze()
        analyzer.print_report()
        
        if args.export:
            export_to_json(analyzer, args.export)
        return
    
    # Usar preset
    if args.preset:
        preset = PRESETS[args.preset]
        params = VBVParams(
            target=preset['target'],
            maxrate=preset['maxrate'],
            bufsize=preset['bufsize'],
            vbv_init=preset['vbv_init']
        )
        analyzer = VBVAnalyzer(params, args.preset)
        analyzer.analyze()
        analyzer.print_report()
        
        if args.export:
            export_to_json(analyzer, args.export)
        return
    
    # Valores customizados
    if len(args.values) == 4:
        target, maxrate, bufsize, vbv_init = args.values
        params = VBVParams(
            target=int(target),
            maxrate=int(maxrate),
            bufsize=int(bufsize),
            vbv_init=vbv_init
        )
        analyzer = VBVAnalyzer(params)
        analyzer.analyze()
        analyzer.print_report()
        
        if args.export:
            export_to_json(analyzer, args.export)
        return
    
    # Sem argumentos válidos
    parser.print_help()

if __name__ == "__main__":
    main()