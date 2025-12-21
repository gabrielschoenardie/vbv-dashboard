import React, { useState, useCallback, useEffect } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Upload,
  Copy,
  Check,
  AlertTriangle,
  XCircle,
  Gauge,
  Activity,
  Zap,
  FileJson,
  ChevronDown,
  Trash2,
  Save,
  Camera,
} from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════════
// SAMPLE DATA (Maximum Quality preset)
// ══════════════════════════════════════════════════════════════════════════════

const SAMPLE_DATA = {
  meta: {
    version: '1.1.0',
    generator: 'vbv_checker.py',
    timestamp: '2025-12-02T02:35:11.547514+00:00',
    preset_used: 'maximum',
  },
  params: {
    target: 10000,
    maxrate: 11200,
    bufsize: 15000,
    vbv_init: 0.85,
  },
  calculations: {
    buffer_inicial: 12750,
    ratio_bufsize_maxrate: 1.34,
    ratio_maxrate_target: 1.12,
    margem_inicial: 2750,
    headroom_percent: 12.0,
  },
  instagram_analysis: {
    buffer_drain_time_sec: 10.6,
    peak_absorption_sec: 0.2,
    recovery_time_sec: 1.32,
    headroom_vs_instagram: 4500,
    quality_margin_percent: 81.8,
    estimated_size_30s_mb: 37.5,
    estimated_size_60s_mb: 75.0,
    estimated_size_90s_mb: 112.5,
  },
  validations: [
    { name: 'Regra de Ouro', status: 'OK', detail: '1.34x entre 1.2x-1.5x', value: 1.34 },
    { name: 'Hierarquia', status: 'OK', detail: '10000 < 11200 < 15000', value: null },
    { name: 'Headroom', status: 'OK', detail: '+12.0% (ideal: 10-25%)', value: 12.0 },
    { name: 'VBV-Init', status: 'OK', detail: '85% (recomendado: 80-90%)', value: 0.85 },
    { name: 'Margem Inicial', status: 'OK', detail: '+2750 kbps de folga', value: 2750 },
    { name: 'Sustentação Pico', status: 'OK', detail: '10.6s suportado', value: 10.6 },
    { name: 'Limite Instagram', status: 'OK', detail: '11200 ≤ 12000 kbps', value: 11200 },
    { name: 'Margem vs IG', status: 'OK', detail: '+82% do internal', value: 81.8 },
  ],
  overall_status: 'OK',
  score: 100,
  x264_params: ['bitrate=10000', 'vbv-maxrate=11200', 'vbv-bufsize=15000', 'vbv-init=0.85'],
  ffmpeg_command: {
    pass1:
      '-c:v libx264 -b:v 10000k -maxrate 11200k -bufsize 15000k -preset slow -pass 1 -f null /dev/null',
    pass2:
      '-c:v libx264 -b:v 10000k -maxrate 11200k -bufsize 15000k -preset slow -pass 2 output.mp4',
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// LOCALSTORAGE HELPERS
// ══════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'vbv-dashboard-data';

const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate basic structure
      if (parsed && parsed.params && parsed.validations) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return null;
};

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

const StatusIcon = ({ status }) => {
  if (status === 'OK') return <Check className="w-4 h-4 text-emerald-400" />;
  if (status === 'WARN') return <AlertTriangle className="w-4 h-4 text-amber-400" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
};

const StatusBadge = ({ status }) => {
  const colors = {
    OK: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    WARN: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    FAIL: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[status] || colors.FAIL}`}
    >
      {status}
    </span>
  );
};

const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700
                 border border-zinc-700 rounded-lg text-xs font-medium transition-all
                 text-zinc-300 hover:text-white"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      {copied ? 'Copiado!' : label}
    </button>
  );
};

// Toast Notification Component
const Toast = ({ message, type, show }) => {
  const colors = {
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg border ${colors[type]}
                    shadow-lg backdrop-blur-sm transition-all transform
                    ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                    z-50`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' && <Check className="w-4 h-4" />}
        {type === 'error' && <XCircle className="w-4 h-4" />}
        {type === 'info' && <Save className="w-4 h-4" />}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

// Gauge Chart Component
const GaugeChart = ({ value, max = 100, label, unit = '%' }) => {
  const percentage = (value / max) * 100;
  const angle = (percentage / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-48 h-28">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#27272a"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Colored arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 251.2} 251.2`}
          className="transition-all duration-1000"
        />
        {/* Needle */}
        <g transform={`rotate(${angle - 90}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="8" fill="#18181b" stroke="#fff" strokeWidth="2" />
        </g>
        {/* Value text */}
        <text x="100" y="90" textAnchor="middle" className="fill-white text-2xl font-bold">
          {value}
          {unit}
        </text>
      </svg>
      <span className="text-zinc-400 text-sm font-medium mt-1">{label}</span>
    </div>
  );
};

// Score Ring Component
const ScoreRing = ({ score, status }) => {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const color = status === 'OK' ? '#10b981' : status === 'WARN' ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="72" cy="72" r="54" fill="none" stroke="#27272a" strokeWidth="10" />
        <circle
          cx="72"
          cy="72"
          r="54"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-white">{score}</span>
        <span className="text-xs text-zinc-500 font-medium tracking-wider">SCORE</span>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════

export default function VBVDashboard() {
  // Load initial data from localStorage or use SAMPLE_DATA
  const [data, setData] = useState(() => {
    const savedData = loadFromLocalStorage();
    return savedData || SAMPLE_DATA;
  });

  const [jsonInput, setJsonInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [parseError, setParseError] = useState('');
  const [hasStoredData, setHasStoredData] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isExporting, setIsExporting] = useState(false);

  // Check if there's stored data on mount
  useEffect(() => {
    setHasStoredData(!!loadFromLocalStorage());
  }, []);

  // Save data to localStorage whenever it changes (except initial load)
  useEffect(() => {
    const isNotSampleData = JSON.stringify(data) !== JSON.stringify(SAMPLE_DATA);
    if (isNotSampleData) {
      const saved = saveToLocalStorage(data);
      if (saved) {
        setHasStoredData(true);
        showToast('Dados salvos automaticamente', 'success');
      }
    }
  }, [data]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const loadJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.params || !parsed.validations) {
        throw new Error('JSON inválido: faltam campos obrigatórios');
      }
      setData(parsed);
      setParseError('');
      setShowInput(false);
      setJsonInput('');
      showToast('JSON carregado com sucesso', 'success');
    } catch (e) {
      setParseError(e.message);
      showToast('Erro ao carregar JSON', 'error');
    }
  }, [jsonInput]);

  const handleClearStorage = () => {
    if (window.confirm('Tem certeza que deseja limpar os dados salvos?')) {
      const cleared = clearLocalStorage();
      if (cleared) {
        setData(SAMPLE_DATA);
        setHasStoredData(false);
        showToast('Dados salvos foram limpos', 'info');
      } else {
        showToast('Erro ao limpar dados', 'error');
      }
    }
  };

  const exportSnapshot = async (quality = 'premium') => {
    if (isExporting) return; // Prevent double-click

    try {
      setIsExporting(true);
      showToast('Gerando snapshot...', 'info');

      const element = document.getElementById('vbv-report-container');
      if (!element) {
        throw new Error('Container não encontrado');
      }

      // Configure quality options
      const qualityValue = quality === 'ultra' ? 1.0 : quality === 'premium' ? 0.95 : 0.85;
      const options = {
        quality: qualityValue,
        pixelRatio: 2, // Retina display
        backgroundColor: '#0f172a', // Dark theme
        cacheBust: true, // Force fresh render
      };

      // Wait for charts to render completely
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate image
      const dataUrl =
        quality === 'ultra' ? await toPng(element, options) : await toJpeg(element, options);

      // Create download link
      const link = document.createElement('a');
      const preset = data.meta.preset_used || 'custom';
      const timestamp = Date.now();
      const extension = quality === 'ultra' ? 'png' : 'jpg';
      link.download = `VBV_Report_${preset}_${timestamp}.${extension}`;
      link.href = dataUrl;
      link.click();

      showToast(
        `Snapshot exportado com sucesso! (${quality === 'ultra' ? 'PNG' : 'JPG'} ${qualityValue * 100}%)`,
        'success'
      );
    } catch (error) {
      console.error('Export snapshot error:', error);
      showToast('Erro ao exportar snapshot. Tente novamente.', 'error');
    } finally {
      setIsExporting(false);
    }
  };
  // Prepare chart data
  const bitrateData = [
    { name: 'Target', value: data.params.target, fill: '#3b82f6' },
    { name: 'Maxrate', value: data.params.maxrate, fill: '#8b5cf6' },
    { name: 'Bufsize', value: data.params.bufsize, fill: '#06b6d4' },
  ];

  // Buffer drain simulation data
  const drainTime = data.instagram_analysis.buffer_drain_time_sec;
  const bufferDrainData = [];
  for (let t = 0; t <= Math.ceil(drainTime) + 2; t += 0.5) {
    const bufferLevel = Math.max(
      0,
      data.params.vbv_init * 100 - (t / drainTime) * data.params.vbv_init * 100
    );
    bufferDrainData.push({ time: t.toFixed(1), buffer: Math.max(0, bufferLevel) });
  }

  const presetNames = {
    maximum: 'Maximum Quality',
    safe: 'Safe Premium',
  };

  const x264String = `:x264-params="${data.x264_params.join(':')}"`;

  return (
    <div
      id="vbv-report-container"
      className="min-h-screen bg-zinc-950 text-white p-6"
      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace" }}
    >
      {/* Toast Notification */}
      <Toast {...toast} />

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">VBV Dashboard</h1>
              <p className="text-zinc-500 text-sm">Instagram Reels Validator</p>
            </div>
            {hasStoredData && (
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-md">
                <Save className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">Dados Salvos</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportSnapshot('premium')}
              disabled={isExporting}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                         ${
                           isExporting
                             ? 'bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed'
                             : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-700 text-white'
                         }`}
            >
              <Camera className="w-4 h-4" />
              {isExporting ? 'Exportando...' : '📸 Exportar JPG'}
            </button>
            {hasStoredData && (
              <button
                onClick={handleClearStorage}
                className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/30
                         border border-red-700/30 rounded-lg text-sm font-medium transition-all
                         text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Dados Salvos
              </button>
            )}
            <button
              onClick={() => setShowInput(!showInput)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700
                         border border-zinc-700 rounded-lg text-sm font-medium transition-all"
            >
              <FileJson className="w-4 h-4" />
              Carregar JSON
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showInput ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* JSON Input Panel */}
        {showInput && (
          <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Cole o JSON exportado pelo vbv_checker.py aqui..."
              className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-lg p-3
                         text-sm text-zinc-300 placeholder-zinc-600 resize-none
                         focus:outline-none focus:border-emerald-500/50"
            />
            {parseError && <p className="text-red-400 text-xs mt-2">{parseError}</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={loadJson}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg
                           text-sm font-medium transition-all"
              >
                Carregar
              </button>
              <button
                onClick={() => {
                  setData(SAMPLE_DATA);
                  setShowInput(false);
                  setJsonInput('');
                  showToast('Exemplo carregado', 'info');
                }}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg
                           text-sm font-medium transition-all"
              >
                Usar Exemplo
              </button>
            </div>
          </div>
        )}

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Preset Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
              Preset
            </div>
            <div className="text-xl font-bold text-white">
              {presetNames[data.meta.preset_used] || data.meta.preset_used || 'Custom'}
            </div>
            <div className="text-zinc-500 text-xs mt-1">v{data.meta.version}</div>
          </div>

          {/* Score Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
                Status
              </div>
              <StatusBadge status={data.overall_status} />
            </div>
            <ScoreRing score={data.score} status={data.overall_status} />
          </div>

          {/* Validations Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
              Validações
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-400">
                {data.validations.filter((v) => v.status === 'OK').length}
              </span>
              <span className="text-zinc-500 text-lg">/</span>
              <span className="text-zinc-400 text-xl">{data.validations.length}</span>
            </div>
            <div className="text-zinc-500 text-xs mt-1">aprovadas</div>
          </div>

          {/* Buffer Init Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">
              Buffer Inicial
            </div>
            <div className="text-3xl font-bold text-cyan-400">
              {data.calculations.buffer_inicial.toLocaleString()}
            </div>
            <div className="text-zinc-500 text-xs mt-1">
              kbps ({(data.params.vbv_init * 100).toFixed(0)}%)
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bitrate Comparison Chart */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Comparativo Bitrates
              </h3>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                IG Safe: 12000
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bitrateData} layout="vertical" barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" domain={[0, 16000]} tick={{ fill: '#71717a', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: '#a1a1aa', fontSize: 12 }}
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    background: '#18181b',
                    border: '1px solid #3f3f46',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value) => [`${value.toLocaleString()} kbps`, '']}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {bitrateData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
                {/* Instagram limit line */}
                <svg>
                  <line
                    x1="75%"
                    y1="0"
                    x2="75%"
                    y2="100%"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                </svg>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Buffer Drain Simulation */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Simulação Buffer Drain
              </h3>
              <span className="text-xs text-emerald-400 font-medium">
                Pico: {drainTime}s sustentado
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={bufferDrainData}>
                <defs>
                  <linearGradient id="bufferGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  dataKey="time"
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  label={{ value: 'Tempo (s)', position: 'bottom', fill: '#52525b', fontSize: 11 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#71717a', fontSize: 11 }}
                  label={{
                    value: 'Buffer %',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#52525b',
                    fontSize: 11,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#18181b',
                    border: '1px solid #3f3f46',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${value.toFixed(1)}%`, 'Buffer']}
                  labelFormatter={(label) => `${label}s`}
                />
                <Area
                  type="monotone"
                  dataKey="buffer"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#bufferGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Validations Grid */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">
            8 Validações Profissionais
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {data.validations.map((v, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${
                  v.status === 'OK'
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : v.status === 'WARN'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-zinc-400">{v.name}</span>
                  <StatusIcon status={v.status} />
                </div>
                <div className="text-xs text-zinc-500 truncate">{v.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Análise Instagram
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Sustentação Pico</span>
                <span className="text-white font-medium">
                  {data.instagram_analysis.buffer_drain_time_sec}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Absorção Pico</span>
                <span className="text-white font-medium">
                  {data.instagram_analysis.peak_absorption_sec}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Margem vs IG</span>
                <span className="text-emerald-400 font-medium">
                  +{data.instagram_analysis.quality_margin_percent}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Tamanho Estimado
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">30s</span>
                <span className="text-white font-medium">
                  {data.instagram_analysis.estimated_size_30s_mb} MB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">60s</span>
                <span className="text-white font-medium">
                  {data.instagram_analysis.estimated_size_60s_mb} MB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-sm">90s</span>
                <span className="text-white font-medium">
                  {data.instagram_analysis.estimated_size_90s_mb} MB
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Métricas VBV
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Ratio buf/max</span>
                <span className="text-white font-medium">
                  {data.calculations.ratio_bufsize_maxrate}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Headroom</span>
                <span className="text-white font-medium">
                  +{data.calculations.headroom_percent}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 text-sm">Margem Inicial</span>
                <span className="text-emerald-400 font-medium">
                  +{data.calculations.margem_inicial.toLocaleString()} kbps
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Commands Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Parâmetros de Encoding
            </h3>
            <div className="flex gap-2">
              <CopyButton text={x264String} label="Copiar x264" />
              <CopyButton text={data.ffmpeg_command.pass2} label="Copiar FFmpeg" />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-zinc-500 mb-1">x264-params:</div>
              <code className="block p-3 bg-zinc-950 rounded-lg text-emerald-400 text-sm overflow-x-auto">
                {x264String}
              </code>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">FFmpeg Pass 1:</div>
              <code className="block p-3 bg-zinc-950 rounded-lg text-cyan-400 text-sm overflow-x-auto">
                {data.ffmpeg_command.pass1}
              </code>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">FFmpeg Pass 2:</div>
              <code className="block p-3 bg-zinc-950 rounded-lg text-cyan-400 text-sm overflow-x-auto">
                {data.ffmpeg_command.pass2}
              </code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-zinc-600 text-xs">
          VBV Checker v{data.meta.version} • {new Date(data.meta.timestamp).toLocaleString('pt-BR')}
          {hasStoredData && <span className="ml-2">• Dados salvos localmente</span>}
        </div>
      </div>
    </div>
  );
}
