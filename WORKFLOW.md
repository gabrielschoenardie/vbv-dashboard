# 🚀 WORKFLOW GIT - PADRÃO DO PROJETO VBV DASHBOARD

Este documento define o **processo obrigatório** para toda implementação de features, correções de bugs e melhorias no VBV Dashboard — Hollywood Edition.

---

## 📐 METODOLOGIA GABRIEL

Toda implementação segue **5 etapas obrigatórias**:

1. **Análise** - Entender o problema/requisito
2. **Planejamento** - Definir arquivos impactados e riscos
3. **Implementação** - Codificar com precisão
4. **Validação** - Testar exaustivamente
5. **Documentação** - Atualizar README + DEV_NOTES

---

## 🔄 WORKFLOW GIT - PASSO A PASSO

### PRÉ-REQUISITOS

- GitHub Codespaces ativo
- Branch dedicada para a feature (`feature/nome-da-feature`)
- Node.js e npm funcionando
- Servidor dev testado (`npm run dev`)

---

### FASE 1: VALIDAÇÃO (🧪)

#### 1.1 - Iniciar Servidor
```bash
npm run dev
```

#### 1.2 - Checklist de Testes

**Teste A - Carregamento Inicial**
- [ ] Dashboard abre sem erros
- [ ] Console sem erros (F12)
- [ ] Dados corretos na tela

**Teste B - Funcionalidade Nova**
- [ ] Feature funciona como esperado
- [ ] Interações funcionam
- [ ] Edge cases cobertos

**Teste C - Regressão**
- [ ] Features antigas ainda funcionam
- [ ] Nenhuma quebra de funcionalidade
- [ ] Performance mantida

**Teste D - Responsividade** (se aplicável)
- [ ] Desktop (1920x1080)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

### FASE 2: GIT WORKFLOW (⚙️)

#### 2.1 - Verificar Status
```bash
git status
```

#### 2.2 - Adicionar Arquivos Modificados
```bash
# Adicionar SOMENTE arquivos relevantes
git add src/pages/arquivo-modificado.jsx
git add src/components/novo-componente.jsx
```

#### 2.3 - Commit com Mensagem Estruturada

**Formato obrigatório:**
```
<emoji> <tipo>: <descrição curta>

<corpo detalhado>
- Item 1
- Item 2
- Item 3

<rodapé>
```

**Emojis permitidos:**
- ✨ `:sparkles:` - Nova feature
- 🐛 `:bug:` - Correção de bug
- 📝 `:memo:` - Documentação
- ♻️ `:recycle:` - Refatoração
- ⚡ `:zap:` - Performance
- 🎨 `:art:` - Estilo/UI
- 🔧 `:wrench:` - Configuração
- 🚀 `:rocket:` - Deploy

**Exemplo:**
```bash
git commit -m "✨ feat: adicionar filtro de validações

- Implementar componente FilterPanel
- Adicionar estado de filtro no dashboard
- Conectar filtro com lista de validações
- Adicionar testes unitários

Closes #filtro-validacoes"
```

#### 2.4 - Push para GitHub
```bash
git push origin feature/nome-da-feature
```

#### 2.5 - Criar Pull Request

**Via GitHub Web:**
1. Acessar repositório
2. Clicar "Compare & pull request"
3. Preencher template de PR (veja abaixo)
4. Criar PR

**Template de PR:**
```markdown
## 📦 [Tipo]: [Título da Feature]

### ✨ O que foi feito
- ✅ Item 1
- ✅ Item 2
- ✅ Item 3

### 🧪 Como testar
1. Passo 1
2. Passo 2
3. Passo 3

### 🎯 Validações
- [x] Código testado manualmente
- [x] Sem erros no console
- [x] Função funciona como esperado
- [x] Código segue padrões do projeto

### 📁 Arquivos modificados
- `caminho/arquivo1.jsx`
- `caminho/arquivo2.jsx`

### 🔗 Relacionado
Closes #issue-number
```

#### 2.6 - Merge
```bash
# Via GitHub Web: Clicar "Merge pull request"

# OU via terminal:
git checkout main
git pull origin main
git merge feature/nome-da-feature
git push origin main
```

#### 2.7 - Atualizar Local
```bash
git checkout main
git pull origin main
```

---

### FASE 3: DOCUMENTAÇÃO (📝)

#### 3.1 - Atualizar README.md

**Adicionar na seção "✨ Features":**
```markdown
- 🆕 **Nome da Feature** - Descrição breve
```

**Se necessário, criar nova seção:**
```markdown
## 🆕 Nome da Feature

Descrição detalhada...

### Uso
1. Passo 1
2. Passo 2
```

#### 3.2 - Atualizar DEV_NOTES.md

**Adicionar na seção "Implementações Recentes":**
```markdown
### [YYYY-MM-DD] <emoji> Título da Feature

**Funcionalidades implementadas:**
- Item 1
- Item 2

**Tecnologias:**
- Tecnologia 1
- Tecnologia 2

**Arquivos modificados:**
- `arquivo1.jsx`
- `arquivo2.jsx`

**Status:** ✅ Testado e funcionando
**Branch:** `feature/nome`
**Commit:** <emoji> tipo: mensagem
```

#### 3.3 - Commit de Documentação
```bash
git add README.md DEV_NOTES.md
git commit -m "📝 docs: documentar feature [nome]

- Adicionar seção no README
- Atualizar DEV_NOTES com implementação
- Marcar tarefa como completa"
git push origin main
```

---

### FASE 4: LIMPEZA (🧹)

#### 4.1 - Deletar Branch Local
```bash
git branch -d feature/nome-da-feature
```

#### 4.2 - (Opcional) Deletar Branch Remota
```bash
git push origin --delete feature/nome-da-feature
```

---

## 📊 CHECKLIST FINAL

Antes de considerar uma feature concluída, verificar:

- [ ] ✅ Código implementado
- [ ] 🧪 Testes passaram (manual)
- [ ] ⚙️ Git workflow executado
- [ ] 🔀 Pull Request criado e mergeado
- [ ] 📝 README.md atualizado
- [ ] 📝 DEV_NOTES.md atualizado
- [ ] 🧹 Branch deletada
- [ ] 🚀 Feature em produção (main)

---

## ⚠️ REGRAS OBRIGATÓRIAS

1. **NUNCA** fazer commit direto na `main`
2. **SEMPRE** criar branch `feature/nome-descritivo`
3. **SEMPRE** testar antes de commit
4. **SEMPRE** usar mensagens de commit estruturadas
5. **SEMPRE** atualizar documentação
6. **SEMPRE** deletar branch após merge

---

## 🔄 COMANDOS RÁPIDOS

### Criar Nova Feature
```bash
git checkout main
git pull origin main
git checkout -b feature/nome-da-feature
# [DESENVOLVER]
npm run dev  # TESTAR
git add .
git commit -m "✨ feat: ..."
git push origin feature/nome-da-feature
# [CRIAR PR NO GITHUB]
# [MERGE]
git checkout main
git pull origin main
git branch -d feature/nome-da-feature
```

### Correção de Bug
```bash
git checkout -b fix/nome-do-bug
# [CORRIGIR]
npm run dev  # TESTAR
git add .
git commit -m "🐛 fix: ..."
git push origin fix/nome-do-bug
# [CRIAR PR]
# [MERGE]
```

---

## 📚 REFERÊNCIAS

- **Conventional Commits:** https://www.conventionalcommits.org/
- **Gitmoji:** https://gitmoji.dev/
- **Git Flow:** https://nvie.com/posts/a-successful-git-branching-model/

---

## 🏆 OBJETIVO

Manter o projeto **profissional**, **rastreável** e **documentado** em todos os momentos.

**"Código sem documentação é código que não existe."**
— Metodologia Gabriel