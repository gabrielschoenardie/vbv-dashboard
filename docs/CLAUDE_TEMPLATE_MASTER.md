# 🎬 TEMPLATE MASTER - VBV Dashboard + Claude
**Versão:** 2.0.0 | **Atualizado:** 07/12/2025

## 🚀 Como usar este template:
1. Copie todo o conteúdo abaixo
2. Preencha os campos entre `[colchetes]`
3. Cole no Claude junto com seu código
4. Aguarde a resposta mágica! ✨

---

## 🔄 CONTEXTO DO PROJETO
- **Repositório:** https://github.com/gabrielschoenardie/vbv-dashboard
- **Branch atual:** `[main/feature/nome-da-branch]`
- **Arquivo trabalhando:** `src/[pasta]/[arquivo].jsx`
- **Última modificação:** `[data/hora]`

## 📁 ESTRUTURA DO PROJETO
```
vbv-dashboard/
├── src/
│   ├── main.jsx (35 linhas)
│   ├── App.jsx (24 linhas)
│   ├── index.css
│   ├── pages/
│   │   ├── home.jsx
│   │   └── vbv-dashboard.jsx (548 linhas)
│   ├── components/
│   │   ├── Sidebar.jsx (53 linhas)
│   │   ├── Header.jsx
│   │   ├── FileUpload.jsx
│   │   ├── ScorePie.jsx
│   │   ├── InstagramBars.jsx
│   │   ├── MetricsGrid.jsx
│   │   └── ValidationsPanel.jsx
│   └── hooks/
│       └── useVBVData.jsx
├── python/
│   └── vbv_checker.py (507 linhas)
├── docs/
│   ├── CLAUDE_TEMPLATE_MASTER.md
│   ├── CODESPACES_GUIDE.md
│   ├── EXEMPLO_TEMPLATE_PREENCHIDO.md
│   └── CHECKLIST_FINAL.md
└── [configs...]
```

## 💻 CÓDIGO ATUAL
```jsx
[COLAR SEU CÓDIGO AQUI]
```

## 🎯 SOLICITAÇÃO
### O que preciso:
[Descreva claramente o que precisa fazer. Exemplos:]
- [ ] Adicionar nova funcionalidade X
- [ ] Corrigir bug Y
- [ ] Refatorar componente Z
- [ ] Implementar localStorage
- [ ] Adicionar validação para...

### Contexto adicional:
[Explique o comportamento atual vs esperado]
- **Comportamento atual:** [o que acontece agora]
- **Comportamento esperado:** [o que deveria acontecer]
- **Erro (se houver):** [mensagem de erro]
- **Console log:** [erros do console]

## ⚙️ ESPECIFICAÇÕES TÉCNICAS
### Stack atual:
- **React:** 19.2.1
- **React Router:** 7.10.1
- **Vite:** 7.2.4
- **Tailwind CSS:** 3.4.18
- **Recharts:** 3.5.1
- **Lucide Icons:** 0.555.0
- **Node.js:** 20.11.0

### Restrições obrigatórias:
- ✅ Manter estrutura de pastas atual (src/pages, src/components, etc)
- ✅ Usar apenas Tailwind classes (sem CSS inline)
- ✅ Compatível com React 19.2
- ✅ Imports relativos corretos
- ✅ Não quebrar rotas existentes (/, /full-dashboard)
- ✅ Manter schema do results.json compatível
- ✅ Seguir configuração do Prettier (.prettierrc.json)
- ✅ Usar formatação automática (formatOnSave: true)

### Funcionalidades que NÃO podem quebrar:
- [ ] Upload e parse de JSON
- [ ] Visualização de gráficos Recharts
- [ ] 8 validações VBV
- [ ] Navegação pelo Sidebar
- [ ] Cálculo de score (0-100)
- [ ] Comandos FFmpeg/x264
- [ ] Responsividade mobile

## 📊 DADOS DE TESTE
### Schema do results.json:
```json
{
  "meta": {
    "version": "1.1.0",
    "generator": "vbv_checker.py",
    "timestamp": "ISO-8601",
    "preset_used": "maximum|safe|null"
  },
  "params": {
    "target": 10000,
    "maxrate": 11200,
    "bufsize": 15000,
    "vbv_init": 0.85
  },
  "calculations": {
    "buffer_inicial": 12750,
    "ratio_bufsize_maxrate": 1.34,
    "ratio_maxrate_target": 1.12,
    "margem_inicial": 2750,
    "headroom_percent": 12.0
  },
  "instagram_analysis": {
    "buffer_drain_time_sec": 10.6,
    "peak_absorption_sec": 0.2,
    "recovery_time_sec": 1.32,
    "headroom_vs_instagram": 4500,
    "quality_margin_percent": 81.8,
    "estimated_size_30s_mb": 37.5,
    "estimated_size_60s_mb": 75.0,
    "estimated_size_90s_mb": 112.5
  },
  "validations": [
    {
      "name": "string",
      "status": "OK|WARN|FAIL",
      "detail": "string",
      "value": "number|null"
    }
  ],
  "overall_status": "OK|WARN|FAIL",
  "score": 0-100,
  "x264_params": ["array", "of", "strings"],
  "ffmpeg_command": {
    "pass1": "string",
    "pass2": "string"
  }
}
```

## 🎨 PADRÕES DE CÓDIGO
### Convenções do projeto:
```jsx
// Componentes: PascalCase
export default function NomeComponente() { }

// Hooks: camelCase com 'use'
const useNomeHook = () => { }

// Funções handlers: handle + Ação
const handleClick = () => { }
const handleSubmit = () => { }

// Estados: [nome, setNome]
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState(null);

// Cores Tailwind principais:
// - Fundo: bg-zinc-950, bg-zinc-900, bg-zinc-800
// - Texto: text-white, text-zinc-400, text-zinc-500
// - Success: text-emerald-400, bg-emerald-500/20
// - Info: text-cyan-400, bg-cyan-500/20
// - Warning: text-amber-400, bg-amber-500/20
// - Error: text-red-400, bg-red-500/20
// - Accent: text-violet-400, text-blue-400

// Ícones: Lucide React
import { IconName } from 'lucide-react';
// Tamanhos padrão: size={16|20|24}

// Bordas e arredondamento:
// - border-zinc-800, border-zinc-700
// - rounded-lg, rounded-xl

// Hover states:
// - hover:bg-zinc-700
// - hover:text-white
// - transition-all
```

### Prettier Config (.prettierrc.json):
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

## 📝 CONVENÇÕES DE COMMIT

### Formato:
```bash
git commit -m "[emoji] [tipo]: [descrição]"
```

### Categorias com Emojis:

| Emoji | Tipo | Uso | Exemplo |
|-------|------|-----|---------|
| ✨ | `Add` | Nova feature/funcionalidade | `✨ Add: localStorage para persistir dados` |
| 🐛 | `Fix` | Correção de bug | `🐛 Fix: erro ao importar JSON vazio` |
| 📝 | `Docs` | Documentação | `📝 Docs: atualizar README com instruções` |
| ♻️ | `Refactor` | Refatoração de código | `♻️ Refactor: simplificar lógica de validação` |
| 🎨 | `Style` | Formatação, UI/UX | `🎨 Style: ajustar espaçamento do dashboard` |
| ⚡ | `Perf` | Performance | `⚡ Perf: otimizar renderização de gráficos` |
| 🧪 | `Test` | Testes | `🧪 Test: adicionar testes para VBV parser` |
| 🔧 | `Config` | Configuração | `🔧 Config: atualizar vite.config.js` |
| 📦 | `Build` | Build/Deploy | `📦 Build: configurar GitHub Actions` |
| 🔄 | `Update` | Atualização de deps | `🔄 Update: React 19.2.1` |
| 🚀 | `Deploy` | Deploy/Release | `🚀 Deploy: versão 1.0.0` |
| 🔥 | `Remove` | Remover código/arquivos | `🔥 Remove: código não utilizado` |
| 🚧 | `WIP` | Work in Progress | `🚧 WIP: implementação parcial do modo escuro` |
| 💄 | `UI` | Atualização de UI | `💄 UI: novo design para cards de métricas` |
| 🔀 | `Merge` | Merge de branches | `🔀 Merge: feature/localStorage into main` |
| ⏪ | `Revert` | Reverter commit | `⏪ Revert: commit abc123` |

### Exemplos práticos:
```bash
# Feature nova
git commit -m "✨ Add: botão de export para PDF"

# Correção
git commit -m "🐛 Fix: validação de bufsize negativo"

# Documentação
git commit -m "📝 Docs: adicionar seção de troubleshooting"

# Múltiplas mudanças (usar o principal)
git commit -m "✨ Add: modo escuro com toggle e persistência"

# Work in Progress
git commit -m "🚧 WIP: sistema de notificações (70% completo)"
```

## ✅ RESULTADO ESPERADO
### Após implementação:
1. [Descreva o resultado final esperado]
2. [Como o usuário vai interagir]
3. [Mudanças visuais esperadas]
4. [Comportamentos novos]

### Critérios de sucesso:
- [ ] Funcionalidade X implementada
- [ ] Sem erros no console
- [ ] Build passa (`npm run build`)
- [ ] Responsivo em mobile
- [ ] Performance mantida
- [ ] Acessibilidade preservada

## 📝 OBSERVAÇÕES ADICIONAIS
[Qualquer informação extra relevante]
- Preferências específicas
- Limitações conhecidas
- Decisões de design já tomadas
- Referências visuais

---

## 🚀 APÓS RECEBER RESPOSTA DO CLAUDE:

### Checklist de implementação:
1. [ ] Revisar código do Claude
2. [ ] Copiar código para arquivo correto
3. [ ] Salvar arquivo (Ctrl+S)
4. [ ] Verificar formatação automática (Prettier)
5. [ ] Testar com `npm run dev`
6. [ ] Verificar no browser (localhost:5173)
7. [ ] Testar responsividade (F12 → Toggle device)
8. [ ] Verificar console por erros
9. [ ] Testar funcionalidades afetadas
10. [ ] Commitar com emoji apropriado

### Comandos Git com emojis:
```bash
# Ver mudanças
git status
git diff

# Adicionar e commitar
git add [arquivo ou .]
git commit -m "✨ Add: [descrição da feature]"

# Push para branch
git push origin [branch]

# Criar PR com título descritivo
# Título PR: "✨ Feature: [Nome da Feature]"
```

---

## 🆘 SE ALGO DER ERRADO:

### Debug rápido:
```bash
# Ver erros detalhados
npm run dev

# Console do browser
F12 → Console

# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install

# Resetar mudanças não commitadas
git checkout -- [arquivo]
git checkout -- .

# Ver diferenças
git diff [arquivo]

# Voltar ao commit anterior
git reset --hard HEAD~1

# Stash temporário
git stash
git stash pop
```

### Erros comuns e soluções:

| Erro | Solução |
|------|---------|
| `Module not found` | Verificar imports e paths |
| `Unexpected token` | Verificar sintaxe JSX |
| `Hook rules` | Hooks apenas no topo de componentes |
| `Hydration failed` | Verificar renderização condicional |
| `CORS error` | Configurar proxy no vite.config.js |

---

## 📚 REFERÊNCIAS RÁPIDAS

### Links úteis:
- **Repo:** https://github.com/gabrielschoenardie/vbv-dashboard
- **Codespaces:** https://github.com/codespaces
- **Actions:** https://github.com/gabrielschoenardie/vbv-dashboard/actions
- **Tailwind Classes:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev/icons/
- **Recharts Docs:** https://recharts.org/en-US/api

### Atalhos Codespaces/VSCode:
- `Ctrl + P` - Busca rápida de arquivo
- `Ctrl + Shift + P` - Command palette
- `Ctrl + B` - Toggle sidebar
- `Ctrl + ` ` - Toggle terminal
- `Ctrl + /` - Comentar linha
- `Alt + Shift + F` - Formatar documento

---

**TEMPLATE VERSÃO 2.0.0** | **Última atualização: 07/12/2025**
**Mantido em:** docs/CLAUDE_TEMPLATE_MASTER.md