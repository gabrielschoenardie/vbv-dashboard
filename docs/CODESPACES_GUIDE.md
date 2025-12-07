# 🎬 GitHub Codespaces + Claude - Guia Completo

## 🚀 CONFIGURAÇÃO INICIAL (5 minutos)

### PASSO 1: Criar o Codespace
1. Acesse: https://github.com/gabrielschoenardie/vbv-dashboard
2. Clique no botão verde **"Code"**
3. Selecione aba **"Codespaces"**
4. Clique em **"Create codespace on main"**
5. Aguarde ~2 minutos para criar

### PASSO 2: Primeira vez no Codespace
Quando abrir o VSCode no navegador:

```bash
# Terminal integrado abrirá automaticamente
# Execute:
npm install
npm run dev

# Resultado esperado:
# VITE v7.2.4  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

### PASSO 3: Abrir Preview
1. Aparecerá popup: "Your application running on port 5173 is available"
2. Clique em **"Open in Browser"**
3. Ou use: Ports → 5173 → 🌐 (ícone globo)

---

## 🔄 WORKFLOW CODESPACES + CLAUDE

### CENÁRIO 1: Adicionar Nova Feature

#### No Codespaces:
```bash
# 1. Criar branch
git checkout -b feature/adicionar-modo-escuro

# 2. Abrir arquivo para editar
# Navegue na árvore lateral até:
# src/pages/vbv-dashboard.jsx
```

#### No Claude (outra aba):
1. Use o **TEMPLATE MASTER**
2. Copie código do Codespaces
3. Cole no template
4. Faça sua solicitação
5. Receba código atualizado

#### Voltar ao Codespaces:
1. Cole o código do Claude
2. Salve (Ctrl+S)
3. Veja mudanças em tempo real no preview
4. Commit quando satisfeito

### CENÁRIO 2: Corrigir Bug

#### Workflow rápido:
```bash
# No terminal do Codespaces
git checkout -b bugfix/corrigir-import-json

# Edite o arquivo
# Copie para Claude se precisar ajuda
# Aplique correção
# Teste no preview

git add .
git commit -m "🐛 Fix: Importação JSON"
git push origin bugfix/corrigir-import-json
```

---

## ⚡ ATALHOS ÚTEIS NO CODESPACES

### Navegação:
- `Ctrl + P` - Buscar arquivo rápido
- `Ctrl + Shift + F` - Buscar em todos arquivos
- `Ctrl + B` - Toggle sidebar
- `Ctrl + ` ` - Toggle terminal

### Edição:
- `Alt + ↑/↓` - Mover linha
- `Shift + Alt + ↓` - Duplicar linha
- `Ctrl + D` - Selecionar próxima ocorrência
- `Ctrl + /` - Comentar linha

### Git (pela interface):
1. Ícone Source Control (lateral esquerda)
2. Stage changes (+)
3. Escrever mensagem commit
4. Ctrl + Enter para commitar
5. Sync changes para push

---

## 🎯 CASOS DE USO ESPECÍFICOS

### 1. Adicionar localStorage ao Dashboard

#### Codespaces:
```javascript
// Abra: src/pages/vbv-dashboard.jsx
// Procure por: const [data, setData] = useState(SAMPLE_DATA);
```

#### Template Claude:
```markdown
## CONTEXTO DO PROJETO
- Repositório: https://github.com/gabrielschoenardie/vbv-dashboard
- Branch atual: feature/adicionar-localStorage
- Arquivo: src/pages/vbv-dashboard.jsx

### Código Atual:
[linha 150-200 do vbv-dashboard.jsx]

### Preciso:
Adicionar localStorage para salvar último JSON carregado

### Resultado Esperado:
- Ao carregar JSON, salvar no localStorage
- Ao abrir página, verificar se tem JSON salvo
- Botão para limpar localStorage
```

### 2. Adicionar Modo Escuro

#### Codespaces:
```javascript
// Criar novo hook: src/hooks/useTheme.jsx
// Modificar: src/App.jsx para incluir contexto
```

#### Template Claude:
```markdown
[Use template com especificações de modo escuro]
```

---

## 📊 MONITORAMENTO

### Ver mudanças em tempo real:
1. **Preview** atualiza automaticamente
2. **Console** no DevTools (F12 no preview)
3. **Terminal** mostra erros de compilação

### Testar em múltiplos dispositivos:
1. No preview, F12
2. Toggle device toolbar (Ctrl+Shift+M)
3. Teste em diferentes tamanhos

---

## 🔧 TROUBLESHOOTING

### Problema: Preview não abre
```bash
# No terminal
npm run dev -- --host

# Vá em Ports
# Clique direito na porta 5173
# "Port Visibility" → "Public"
```

### Problema: Mudanças não aparecem
```bash
# Hard refresh no preview
Ctrl + Shift + R

# Ou reiniciar Vite
Ctrl + C
npm run dev
```

### Problema: Git não funciona
```bash
# Configurar credenciais
git config --global user.email "seu-email@gmail.com"
git config --global user.name "Seu Nome"
```

---

## 💾 SALVAR SESSÃO

### Codespace fica inativo após:
- **30 minutos** sem atividade (grátis)
- **Configurável** nas settings

### Para retomar:
1. https://github.com/codespaces
2. Clique no seu codespace
3. Continua exatamente onde parou!

### Deletar quando não precisar:
1. ⚡ economia de recursos
2. Settings → Delete codespace

---

## 🎨 PERSONALIZAÇÃO (OPCIONAL)

### Tema escuro:
1. Ctrl + K → Ctrl + T
2. Escolha tema preferido

### Extensões úteis:
1. Clique em Extensions (lateral)
2. Instale:
   - Tailwind CSS IntelliSense
   - ES7+ React snippets
   - GitLens
   - Prettier

### Settings Sync:
1. Sign in com GitHub
2. Settings sincronizam automaticamente

---

## 📝 COMANDOS RÁPIDOS - COPIE E USE

### Início do dia:
```bash
git checkout main
git pull origin main
npm install
npm run dev
```

### Nova feature:
```bash
git checkout -b feature/nome
# trabalhar...
git add .
git commit -m "✨ Add: descrição"
git push -u origin feature/nome
```

### Voltar ao main:
```bash
git checkout main
git pull origin main
```

---

## 🚨 REGRAS DE OURO

1. **SEMPRE** crie branch antes de mudar código
2. **TESTE** no preview antes de commitar
3. **COPIE** código para Claude quando precisar ajuda
4. **COMMIT** frequentemente (a cada pequena vitória)
5. **SYNC** com GitHub após cada sessão

---

## 📱 MOBILE WORKFLOW

### Funciona no celular/tablet:
1. Abra github.com no navegador mobile
2. Codespaces funciona!
3. Use teclado bluetooth para melhor experiência

---