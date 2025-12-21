# DEV NOTES — VBV Dashboard

## 🎯 METODOLOGIA DE DESENVOLVIMENTO

Este projeto segue a **Metodologia Gabriel** com workflow Git profissional obrigatório.

**Documento principal:** `WORKFLOW.md`

### Regras Fundamentais
1. Todo desenvolvimento em branch `feature/` ou `fix/`
2. Testes obrigatórios antes de commit (`npm run dev`)
3. Mensagens de commit estruturadas (conventional commits + emoji)
4. Pull Request com template completo
5. Documentação atualizada (README + DEV_NOTES)
6. Limpeza de branches após merge

### Processo em 5 Etapas
1. **Análise** - Entender requisito
2. **Planejamento** - Definir impacto
3. **Implementação** - Codificar
4. **Validação** - Testar exaustivamente
5. **Documentação** - Atualizar docs

**Ver detalhes completos em:** `WORKFLOW.md`

---

## 📋 CONTEXTO DO PROJETO

Contexto:
- Projeto criado com Gabriel. Objetivo manter zero recompressão para Reels.
- Python script vbv_checker.py gera arquivo results.json com schema conhecido.
- Frontend já mapeia esse schema (params, calculations, instagram_analysis, validations, score, meta, x264_params, ffmpeg_command).

Decisões técnicas:
- Tailwind v3 por compatibilidade com Vite.
- Recharts para visualização.
- React Router para múltiplas páginas.
- vite.config.js com @vitejs/plugin-react para transformar JSX no build.

---

## 📝 TAREFAS E ROADMAP

Tarefas imediatas:
1. ✅ Automatizar import JSON → salvar última análise no localStorage (persistência) - CONCLUÍDO
2. Exportar relatórios em HTML/PDF.
3. Integrar um endpoint local (express) opcional para receber results.json via POST.
4. Criar CI (GitHub Actions) para build/test.

---

## 📋 Implementações Recentes

### [2024-12-21] ✨ Export Snapshot JPG Premium

**Funcionalidades implementadas:**
- Exportação de análise VBV como imagem JPG/PNG de alta qualidade
- Botão "📸 Exportar JPG" no header do dashboard (verde emerald)
- Qualidade Premium (JPG 95%)
- Resolução Retina (pixelRatio: 2) para imagens nítidas
- Nome automático: VBV_Report_[preset]_[timestamp].jpg
- Sistema de loading para prevenir múltiplos cliques (isExporting state)
- Toast notifications para feedback (Gerando/Sucesso/Erro)
- Timeout de 300ms para garantir renderização completa dos gráficos

**Tecnologias:**
- html-to-image (^1.11.13)
- React Hooks: useState (isExporting)
- Async/await para captura de imagem
- DOM API (createElement, click) para download automático

**Arquivos modificados:**
- `src/pages/vbv-dashboard.jsx` (+62 linhas)
- `package.json` (nova dependência)
- `package-lock.json` (auto-gerado)

**Status:** ✅ Testado e funcionando perfeitamente
**Branch:** `feature/export-snapshot-jpg`
**Commit:** ✨ feat: adicionar export de snapshot JPG premium
**PR:** #2 (merged)

---

### [2025-12-17] ✨ localStorage - Persistência de Dados VBV

**Funcionalidades implementadas:**
- Salvamento automático ao carregar JSON customizado
- Carregamento automático na inicialização do dashboard
- UI: Sistema de notificações Toast (sucesso/erro/info)
- UI: Badge "Dados Salvos" no header
- UI: Botão "Limpar Dados Salvos" com confirmação
- Validação de dados antes de salvar/carregar
- Fallback para SAMPLE_DATA se localStorage vazio/corrompido

**Tecnologias:**
- localStorage API (browser native)
- React Hooks: useState, useEffect, useCallback
- Toast notifications com auto-dismiss (3s)

**Arquivos modificados:**
- `src/pages/vbv-dashboard.jsx`

**Status:** ✅ Testado e funcionando
**Branch:** `feature/adicionar-localStorage`
**Commit:** ✨ feat: implementar persistência com localStorage

---

### [2025-12-17] 📝 Workflow e Metodologia

**Funcionalidades implementadas:**
- Criação do documento WORKFLOW.md (processo Git completo)
- Criação do CHECKLIST.md (template reutilizável)
- Atualização do DEV_NOTES.md (seção de metodologia)
- Definição de regras obrigatórias de desenvolvimento

**Objetivo:**
Estabelecer padrão profissional permanente para todas as implementações futuras.

**Documentos criados:**
- `WORKFLOW.md` - Processo completo de desenvolvimento
- `CHECKLIST.md` - Template de validação

**Status:** ✅ Implementado
**Commit:** 📝 docs: adicionar workflow e metodologia padrão