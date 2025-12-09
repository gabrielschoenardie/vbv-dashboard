# PROJECT STRUCTURE — Referência Permanente
Esta é a estrutura oficial do projeto VBV Dashboard — Hollywood Edition.
O assistente deve usar este arquivo como referência imutável.

```
📁 Raiz
vbv-dashboard/
│
├── 📁 .github/
│   └── workflows/
│       └── build.yml              # CI/CD pipeline
├── 📁 .vscode/
│   └── settings.json             # Configurações VSCode + Prettier
├── 📁 docs/
│   ├── CLAUDE_TEMPLATE_MASTER.md # Template v2.0
│   ├── CODESPACES_GUIDE.md      # Guia Codespaces
│   ├── EXEMPLO_TEMPLATE_PREENCHIDO.md
│   └── CHECKLIST_FINAL.md
├── 📁 src/
│   ├── main.jsx                 # Entry point com rotas
│   ├── App.jsx                  # Layout com Outlet
│   ├── index.css                # Estilos globais + Tailwind
│   ├── 📁 pages/
│   │   ├── home.jsx             # Dashboard principal
│   │   └── vbv-dashboard.jsx    # Dashboard completo (548 linhas)
│   ├── 📁 components/
│   │   ├── Sidebar.jsx          # Navegação lateral
│   │   ├── Header.jsx           # Cabeçalho
│   │   ├── FileUpload.jsx       # Upload JSON
│   │   ├── ScorePie.jsx         # Gráfico de score
│   │   ├── InstagramBars.jsx    # Análise Instagram
│   │   ├── MetricsGrid.jsx      # Grid de métricas
│   │   └── ValidationsPanel.jsx # Painel de validações
│   └── 📁 hooks/
│       └── useVBVData.jsx        # Hook para dados VBV
├── 📁 python/
│   └── vbv_checker.py            # Script Python (507 linhas)
├── 📁 examples/
│   └── sample_results.json       # JSON de exemplo
│
├── .editorconfig                 # Configuração editor
├── .gitignore                    # Arquivos ignorados
├── .nvmrc                        # Node version (20.11.0)
├── .prettierignore               # Arquivos ignorados Prettier
├── .prettierrc.json              # Configuração Prettier
├── index.html                    # HTML entry point
├── package.json                  # Dependências e scripts
├── package-lock.json             # Lock file
├── postcss.config.js             # PostCSS config
├── README.md                     # Documentação principal
├── tailwind.config.js            # Tailwind config
└── vite.config.js                # Vite config
```
