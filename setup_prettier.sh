#!/bin/bash

# =========================================
# SCRIPT DE CONFIGURAÇÃO RÁPIDA
# VBV Dashboard - Setup Prettier
# =========================================

echo "🎬 VBV Dashboard - Configurando Formatação..."
echo "==========================================="

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Criar diretório .vscode se não existir
echo -e "${YELLOW}📁 Criando diretório .vscode...${NC}"
mkdir -p .vscode

# 2. Criar settings.json
echo -e "${YELLOW}⚙️ Configurando VSCode settings...${NC}"
cat > .vscode/settings.json << 'EOF'
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "javascriptreact": "javascriptreact"
  },
  "tailwindCSS.emmetCompletions": true,
  "files.associations": {
    "*.jsx": "javascriptreact"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.rulers": [100],
  "editor.bracketPairColorization.enabled": true
}
EOF

# 3. Criar .prettierrc.json
echo -e "${YELLOW}🎨 Criando configuração do Prettier...${NC}"
cat > .prettierrc.json << 'EOF'
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
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "proseWrap": "preserve"
}
EOF

# 4. Criar .prettierignore
echo -e "${YELLOW}🚫 Criando .prettierignore...${NC}"
cat > .prettierignore << 'EOF'
# Dependencies
node_modules
package-lock.json
yarn.lock

# Production
dist
build

# IDE
.vscode
.idea

# Misc
*.min.js
*.min.css
coverage
*.log
.DS_Store
.env*

# Python
__pycache__
*.pyc
*.pyo
*.pyd
.Python
venv/
env/

# Git
.git
.gitignore

# Docs
*.md
EOF

# 5. Criar .editorconfig
echo -e "${YELLOW}📝 Criando .editorconfig...${NC}"
cat > .editorconfig << 'EOF'
# EditorConfig is awesome: https://EditorConfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.{js,jsx,json}]
indent_size = 2

[*.py]
indent_size = 4

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
EOF

# 6. Verificar se o Prettier está instalado
echo -e "${YELLOW}📦 Verificando Prettier...${NC}"
if ! npm list prettier >/dev/null 2>&1; then
  echo -e "${YELLOW}Installing Prettier...${NC}"
  npm install --save-dev prettier
fi

# 7. Adicionar scripts ao package.json se não existirem
echo -e "${YELLOW}📋 Adicionando scripts ao package.json...${NC}"
if ! grep -q '"format"' package.json; then
  npx json -I -f package.json -e 'this.scripts["format"] = "prettier --write \"src/**/*.{js,jsx,json,css,html}\""'
  npx json -I -f package.json -e 'this.scripts["format:check"] = "prettier --check \"src/**/*.{js,jsx,json,css,html}\""'
fi

# 8. Formatar todos os arquivos existentes
echo -e "${YELLOW}✨ Formatando arquivos existentes...${NC}"
npx prettier --write "src/**/*.{js,jsx,json,css,html}" 2>/dev/null || true

# 9. Resultado final
echo ""
echo -e "${GREEN}==========================================="
echo -e "✅ CONFIGURAÇÃO COMPLETA!"
echo -e "==========================================="
echo ""
echo -e "📝 Arquivos criados/atualizados:"
echo -e "   ${GREEN}✓${NC} .vscode/settings.json"
echo -e "   ${GREEN}✓${NC} .prettierrc.json"
echo -e "   ${GREEN}✓${NC} .prettierignore"
echo -e "   ${GREEN}✓${NC} .editorconfig"
echo -e "   ${GREEN}✓${NC} package.json (scripts adicionados)"
echo ""
echo -e "${YELLOW}🔄 IMPORTANTE: Faça reload da janela!${NC}"
echo -e "   1. Pressione: Ctrl+Shift+P"
echo -e "   2. Digite: Developer: Reload Window"
echo -e "   3. Pressione Enter"
echo ""
echo -e "${GREEN}✨ Comandos disponíveis:${NC}"
echo -e "   npm run format       - Formatar todos os arquivos"
echo -e "   npm run format:check - Verificar formatação"
echo ""
echo -e "${GREEN}🚀 Próximo passo:${NC}"
echo -e "   git add ."
echo -e "   git commit -m \"🔧 Config: configurar Prettier e EditorConfig\""
echo -e "   git push origin main"
echo ""