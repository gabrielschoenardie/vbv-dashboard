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
├── WORKFLOW.md                   # Processo Git obrigatório (Metodologia Gabriel)
├── CHECKLIST.md                  # Template de validação para features
├── DEV_NOTES.md                  # Notas de desenvolvimento e histórico
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

## 📝 Descrição dos Novos Arquivos

### WORKFLOW.md
Documento obrigatório que define o processo Git profissional em 4 fases:
- **FASE 1 (🧪):** Validação com testes A/B/C/D
- **FASE 2 (⚙️):** Git workflow em 7 passos
- **FASE 3 (📝):** Documentação (README + DEV_NOTES)
- **FASE 4 (🧹):** Limpeza de branches

### CHECKLIST.md
Template reutilizável para validação de features com seções:
- Testes Funcionais
- Testes de Regressão
- Git Workflow
- Documentação
- Limpeza

### DEV_NOTES.md
Histórico de implementações e decisões técnicas:
- Metodologia de desenvolvimento
- Contexto do projeto
- Tarefas e roadmap
- Implementações recentes