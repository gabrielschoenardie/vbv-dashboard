# PROJECT STRUCTURE — Referência Permanente

Esta é a estrutura oficial do projeto VBV Dashboard — Hollywood Edition.
O assistente deve usar este arquivo como referência imutável.

📁 Raiz
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── pages/
    │   ├── home.jsx
    │   └── vbv-dashboard.jsx
    │
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Header.jsx
    │   ├── FileUpload.jsx
    │   ├── ScorePie.jsx
    │   ├── InstagramBars.jsx
    │   ├── MetricsGrid.jsx
    │   └── ValidationsPanel.jsx
    │
    └── hooks/
        └── useVBVData.jsx

📁 python/
└── vbv_checker.py

📁 examples/
└── sample_results.json
