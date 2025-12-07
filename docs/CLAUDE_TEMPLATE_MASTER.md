# 🎬 TEMPLATE MASTER - VBV Dashboard + Claude

## Como usar este template:
1. Copie todo o conteúdo abaixo
2. Preencha os campos entre [colchetes]
3. Cole no Claude junto com seu código
4. Aguarde a resposta mágica! ✨

---

## 🔄 CONTEXTO DO PROJETO
- **Repositório:** https://github.com/gabrielschoenardie/vbv-dashboard
- **Branch atual:** [main/feature/nome-da-branch]
- **Arquivo trabalhando:** src/[pasta]/[arquivo].jsx
- **Última modificação:** [data/hora]

## 📁 ESTRUTURA DO PROJETO
```
vbv-dashboard/
├── src/
│   ├── main.jsx (35 linhas)
│   ├── App.jsx (24 linhas)
│   ├── pages/
│   │   ├── home.jsx
│   │   └── vbv-dashboard.jsx (548 linhas)
│   ├── components/
│   │   ├── Sidebar.jsx (53 linhas)
│   │   └── [outros componentes]
│   └── hooks/
│       └── useVBVData.jsx
├── python/
│   └── vbv_checker.py (507 linhas)
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

## ⚙️ ESPECIFICAÇÕES TÉCNICAS
### Stack atual:
- **React:** 19.2.1
- **React Router:** 7.10.1
- **Vite:** 7.2.4
- **Tailwind CSS:** 3.4.18
- **Recharts:** 3.5.1
- **Lucide Icons:** 0.555.0

### Restrições obrigatórias:
- ✅ Manter estrutura de pastas atual (src/pages, src/components, etc)
- ✅ Usar apenas Tailwind classes (sem CSS inline)
- ✅ Compatível com React 19.2
- ✅ Imports relativos corretos
- ✅ Não quebrar rotas existentes (/, /full-dashboard)
- ✅ Manter schema do results.json compatível

### Funcionalidades que NÃO podem quebrar:
- [ ] Upload e parse de JSON
- [ ] Visualização de gráficos Recharts
- [ ] 8 validações VBV
- [ ] Navegação pelo Sidebar
- [ ] Cálculo de score
- [ ] Comandos FFmpeg/x264

## 📊 DADOS DE TESTE
### Schema do results.json:
```json
{
  "meta": { "version", "generator", "timestamp", "preset_used" },
  "params": { "target", "maxrate", "bufsize", "vbv_init" },
  "calculations": { ... },
  "instagram_analysis": { ... },
  "validations": [ ... ],
  "overall_status": "OK/WARN/FAIL",
  "score": 0-100,
  "x264_params": [ ... ],
  "ffmpeg_command": { "pass1", "pass2" }
}
```

## 🎨 PADRÕES DE CÓDIGO
### Convenções do projeto:
```jsx
// Componentes: PascalCase
export default function NomeComponente() { }

// Hooks: camelCase com 'use'
const useNomeHook = () => { }

// Cores Tailwind principais:
// - Fundo: bg-zinc-950, bg-zinc-900
// - Texto: text-white, text-zinc-400
// - Destaque: text-emerald-400, text-cyan-400
// - Avisos: text-amber-400, text-red-400

// Ícones: Lucide React
import { IconName } from 'lucide-react';
```

## ✅ RESULTADO ESPERADO
### Após implementação:
1. [Descreva o resultado final esperado]
2. [Como o usuário vai interagir]
3. [Mudanças visuais esperadas]

### Critérios de sucesso:
- [ ] Funcionalidade X implementada
- [ ] Sem erros no console
- [ ] Build passa (npm run build)
- [ ] Responsivo em mobile
- [ ] Performance mantida

## 📝 OBSERVAÇÕES ADICIONAIS
[Qualquer informação extra relevante]

---

## 🚀 APÓS RECEBER RESPOSTA DO CLAUDE:

### Checklist de implementação:
1. [ ] Copiar código do Claude
2. [ ] Colar no arquivo correto
3. [ ] Salvar arquivo
4. [ ] Testar com `npm run dev`
5. [ ] Verificar no browser (localhost:5173)
6. [ ] Testar as rotas
7. [ ] Commitar mudanças

### Comandos Git:
```bash
git status
git add [arquivo]
git commit -m "✨ Add: [descrição]"
git push origin [branch]
```

---

## 🆘 SE ALGO DER ERRADO:

### Debug rápido:
```bash
# Ver erros
npm run dev

# Limpar cache
rm -rf node_modules
npm install

# Resetar mudanças
git checkout -- [arquivo]

# Ver diferenças
git diff [arquivo]
```

---