# 🎯 EXEMPLO PRÁTICO - Adicionar localStorage ao VBV Dashboard

## USE ESTE EXEMPLO AGORA MESMO! Copie e cole no Claude:

---

## 🔄 CONTEXTO DO PROJETO
- **Repositório:** https://github.com/gabrielschoenardie/vbv-dashboard
- **Branch atual:** feature/adicionar-localStorage
- **Arquivo trabalhando:** src/pages/vbv-dashboard.jsx
- **Última modificação:** 07/12/2025

## 💻 CÓDIGO ATUAL
```jsx
// Linhas 140-170 do vbv-dashboard.jsx
export default function VBVDashboard() {
  const [data, setData] = useState(SAMPLE_DATA);
  const [jsonInput, setJsonInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [parseError, setParseError] = useState('');

  const loadJson = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.params || !parsed.validations) {
        throw new Error('JSON inválido: faltam campos obrigatórios');
      }
      setData(parsed);
      setParseError('');
      setShowInput(false);
    } catch (e) {
      setParseError(e.message);
    }
  }, [jsonInput]);
```

## 🎯 SOLICITAÇÃO
### O que preciso:
- [x] Adicionar localStorage para salvar último JSON carregado
- [x] Ao abrir a página, carregar JSON salvo automaticamente
- [x] Botão para limpar dados salvos
- [x] Indicador visual quando há dados salvos

### Contexto adicional:
- **Comportamento atual:** Sempre carrega SAMPLE_DATA ao atualizar página
- **Comportamento esperado:** Carregar último JSON do localStorage se existir
- **Chave localStorage:** 'vbv-dashboard-data'

## ⚙️ ESPECIFICAÇÕES TÉCNICAS
### Stack atual:
- **React:** 19.2.1
- **Vite:** 7.2.4
- **Tailwind CSS:** 3.4.18

### Restrições obrigatórias:
- ✅ Manter schema do JSON compatível
- ✅ Não quebrar o SAMPLE_DATA como fallback
- ✅ Adicionar try/catch para erros de localStorage
- ✅ Botão de limpar deve ter confirmação

## ✅ RESULTADO ESPERADO
### Após implementação:
1. Ao carregar um JSON, ele é salvo automaticamente
2. Ao recarregar a página, o JSON salvo é carregado
3. Botão "Limpar Dados Salvos" com ícone Trash2
4. Badge mostrando quando há dados salvos
5. Toast/notificação ao salvar/limpar

### Por favor, modifique o componente VBVDashboard para incluir:
1. useEffect para carregar dados do localStorage
2. Função para salvar no localStorage
3. Função para limpar localStorage
4. UI para o botão de limpar
5. Indicador de dados salvos

Mantenha todo o resto do código intacto, apenas adicione a funcionalidade de persistência.