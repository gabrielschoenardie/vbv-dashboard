# VBV Dashboard — Hollywood Edition

Resumo: Dashboard React para visualizar resultados do vbv_checker.py (VBV Analyzer para Instagram Reels).

Como rodar (dev):
1. npm install
2. npm run dev
3. abrir http://localhost:5173

Como construir/preview:
1. npm run build
2. npm run preview

Estrutura:
- src/: frontend React + components
- src/pages/vbv-dashboard.jsx: versão full dashboard com SAMPLE_DATA
- python/vbv_checker.py: analisador que exporta results.json
- examples/sample_results.json: arquivo de exemplo para testes

Checklist (básico):
- [ ] `npm install` roda sem erros
- [ ] `npm run dev` abre sem erros
- [ ] rotas / e /full-dashboard funcionam
- [ ] carregar JSON atualiza gráficos