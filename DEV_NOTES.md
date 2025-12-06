# DEV NOTES — VBV Dashboard

Contexto:
- Projeto criado com Gabriel. Objetivo manter zero recompressão para Reels.
- Python script vbv_checker.py gera arquivo results.json com schema conhecido.
- Frontend já mapeia esse schema (params, calculations, instagram_analysis, validations, score, meta, x264_params, ffmpeg_command).

Decisões técnicas:
- Tailwind v3 por compatibilidade com Vite.
- Recharts para visualização.
- React Router para múltiplas páginas.
- vite.config.js com @vitejs/plugin-react para transformar JSX no build.

Tarefas imediatas:
1. Automatizar import JSON -> salvar última análise no localStorage (persistência).
2. Exportar relatórios em HTML/PDF.
3. Integrar um endpoint local (express) opcional para receber results.json via POST.
4. Criar CI (GitHub Actions) para build/test.