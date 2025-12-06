# 🎬 VBV Dashboard — Hollywood Edition

[![CI/CD Pipeline](https://github.com/gabrielschoenardie/vbv-dashboard/actions/workflows/build.yml/badge.svg)](https://github.com/gabrielschoenardie/vbv-dashboard/workflows/build.yml)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Dashboard profissional para análise e validação de parâmetros VBV (Video Buffering Verifier) otimizado para **Instagram Reels** com zero recompressão.

![VBV Dashboard Preview](https://via.placeholder.com/800x400?text=VBV+Dashboard+Preview)

## ✨ Features

- 📊 **8 Validações Profissionais** de parâmetros VBV
- 📈 **Visualizações em Tempo Real** com Recharts
- 🎯 **Score de Qualidade** (0-100 pontos)
- 📱 **Análise Específica para Instagram** Reels
- 🎬 **Comandos FFmpeg** prontos para uso
- 🔧 **Parâmetros x264** otimizados
- 📦 **Presets Profissionais** (Maximum Quality / Safe Premium)
- 🌙 **Tema Dark** cinematográfico

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Python 3.9+ (para o vbv_checker.py)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabrielschoenardie/vbv-dashboard.git
cd vbv-dashboard

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:5173

## 📁 Estrutura do Projeto

```
vbv-dashboard/
├── src/
│   ├── main.jsx            # Entry point
│   ├── App.jsx             # Layout principal
│   ├── index.css           # Estilos globais
│   │
│   ├── pages/
│   │   ├── home.jsx        # Página inicial
│   │   └── vbv-dashboard.jsx  # Dashboard completo
│   │
│   ├── components/
│   │   ├── Sidebar.jsx     # Navegação lateral
│   │   ├── Header.jsx      # Cabeçalho
│   │   ├── FileUpload.jsx  # Upload JSON
│   │   ├── ScorePie.jsx    # Gráfico de score
│   │   ├── InstagramBars.jsx  # Análise Instagram
│   │   ├── MetricsGrid.jsx # Grid de métricas
│   │   └── ValidationsPanel.jsx  # Painel de validações
│   │
│   └── hooks/
│       └── useVBVData.jsx  # Hook para dados VBV
│
├── python/
│   └── vbv_checker.py      # Analisador VBV (Python)
│
├── examples/
│   └── sample_results.json # Exemplo de output
│
├── public/
│   └── (assets públicos)
│
└── config files...
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor dev (Vite)

# Build
npm run build        # Build para produção
npm run preview      # Preview do build

# Python VBV Checker
python python/vbv_checker.py --preset maximum
python python/vbv_checker.py --preset safe --export results.json
```

## 📊 Usando o VBV Checker

### Presets Disponíveis

| Preset | Target | Maxrate | Bufsize | Uso Ideal |
|--------|--------|---------|---------|-----------|
| **maximum** | 10000 | 11200 | 15000 | Reels ≤30s |
| **safe** | 8000 | 9000 | 12500 | Reels >40s |

### Exemplo de Uso

```bash
# Usar preset Maximum Quality
python python/vbv_checker.py --preset maximum --export results.json

# Valores customizados
python python/vbv_checker.py 10000 11200 15000 0.85 --export custom.json

# Recomendar preset baseado em duração
python python/vbv_checker.py --recommend 25
```

## 🎯 As 8 Validações Profissionais

1. **Regra de Ouro** - Ratio bufsize/maxrate (1.2x-1.5x ideal)
2. **Hierarquia** - target < maxrate < bufsize
3. **Headroom** - Margem maxrate/target (10-25% ideal)
4. **VBV-Init** - Buffer inicial (80-90% recomendado)
5. **Margem Inicial** - Folga do buffer
6. **Sustentação de Pico** - Tempo de drain do buffer
7. **Limite Instagram** - Maxrate ≤ 12000 kbps
8. **Margem vs IG** - Qualidade vs processamento interno

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Amazing Feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Persistência local (localStorage)
- [ ] Export PDF dos relatórios
- [ ] API endpoint para upload
- [ ] Comparação entre múltiplos JSONs
- [ ] Modo claro/escuro
- [ ] Internacionalização (i18n)

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 👨‍💻 Autor

**Gabriel Schoenardie**
- GitHub: [@gabrielschoenardie](https://github.com/gabrielschoenardie)

## 🙏 Agradecimentos

- [Recharts](https://recharts.org) - Gráficos React
- [Lucide Icons](https://lucide.dev) - Ícones
- [Tailwind CSS](https://tailwindcss.com) - Estilização
- [Vite](https://vitejs.dev) - Build tool

---

⭐️ Se este projeto te ajudou, considere dar uma estrela!
