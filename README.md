# 📊 SCALPER SIGNAL - Sala de Sinais de Trading

Uma plataforma web interativa para compartilhar sinais de trading em tempo real para **Forex, Opções Binárias e Criptomoedas**. Perfeita para scalping com prazos curtos (1m, 5m, 15m, 1h).

## 🚀 Características

✅ **Dashboard em Tempo Real** - Visualize sinais conforme são gerados
✅ **Filtros Avançados** - Por par, tipo (CALL/PUT) e timeframe
✅ **Gerenciamento de Risco** - Entrada, TP (Take Profit) e SL (Stop Loss)
✅ **Análise Visual** - Gráficos de performance
✅ **Notificações** - Alertas automáticos de novos sinais
✅ **Interface Responsiva** - Funciona em desktop e mobile
✅ **Design Profissional** - Tema dark mode com cores de trading
✅ **Histórico** - Estatísticas de ganhos/perdas

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Sem dependências externas além do Chart.js (CDN)

## 🔧 Como Usar

### 1. **Clonar o Repositório**
```bash
git clone https://github.com/Macuizzy/scalper-signal.git
cd scalper-signal
```

### 2. **Abrir Localmente**
- Simplesmente abra o arquivo `index.html` no navegador
- Ou use um servidor local (recomendado):

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (se tiver http-server instalado)
npx http-server

# Com VS Code Live Server
# Clique com botão direito em index.html > Open with Live Server
```

Acesse: `http://localhost:8000`

### 3. **Hospedar no GitHub Pages**
- Vá em Settings > Pages
- Selecione "Deploy from branch"
- Branch: `main` | Pasta: `/ (root)`
- Seu site estará em: `https://seu-usuario.github.io/scalper-signal`

## 📱 Interface Principal

### Dashboard
- **Sinais Hoje**: Total de sinais gerados no dia
- **Taxa de Acerto**: Percentual de sinais ganhos
- **Último Sinal**: Quando foi o último sinal
- **Lucro/Prejuízo**: Resultado acumulado

### Filtros
- Filtre por **Par** (EUR/USD, GBP/USD, GOLD, etc)
- Filtre por **Tipo** (CALL - Alta | PUT - Baixa)
- Filtre por **Timeframe** (1m, 5m, 15m, 1h)

### Cards de Sinais
Cada sinal mostra:
- 📊 Par e tipo (CALL/PUT)
- 💰 Preço de entrada
- ✅ Take Profit (TP)
- ❌ Stop Loss (SL)
- ⏱️ Timeframe
- 📝 Análise técnica
- 🕐 Hora do sinal

### Admin Section
Adicione novos sinais manualmente:
- Preencha os dados do sinal
- Clique em "Enviar Sinal"
- O sinal aparecerá em tempo real para todos

## 💡 Como Adicionar Sinais

1. Role até a seção **"➕ ADICIONAR NOVO SINAL"** no final
2. Preencha os campos:
   - **Par**: EURUSD, GBPUSD, etc
   - **Tipo**: CALL (acredita que vai subir) ou PUT (acredita que vai cair)
   - **Entrada**: Preço de entrada
   - **TP**: Preço alvo (lucro)
   - **SL**: Preço de parada (perda máxima)
   - **Timeframe**: 1m, 5m, 15m ou 1h
   - **Análise**: Suas observações técnicas
3. Clique em "Enviar Sinal"
4. 🎉 Sinal vai aparecer no topo da lista!

## 📊 Exemplos de Sinais

### ✅ CALL (Esperamos alta)
```
Par: EURUSD
Entrada: 1.0950
TP: 1.0965
SL: 1.0935
Análise: Rompimento da resistência com volume alto
```

### ❌ PUT (Esperamos baixa)
```
Par: GBPUSD
Entrada: 1.2750
TP: 1.2730
SL: 1.2770
Análise: Suporte testado 3 vezes, possível reversão
```

## 🎯 Cálculo de Risco/Recompensa

O app calcula automaticamente:
```
RR = (TP - Entrada) / (Entrada - SL)
```

**Exemplo:**
- Entrada: 100
- TP: 110
- SL: 95
- RR = (110 - 100) / (100 - 95) = **1:2** ✅ Bom!

## 📈 Estatísticas

A plataforma rastreia:
- ✅ Total de sinais
- 📊 Taxa de acerto (%)
- 💰 Lucro/Prejuízo estimado
- 🔴 Sinais ativos
- 📁 Histórico completo

## 🌐 Pares Suportados

**Forex:**
- EUR/USD
- GBP/USD
- USD/JPY
- AUD/USD

**Commodities:**
- GOLD (Ouro)
- OIL (Petróleo WTI)

**Criptomoedas:**
- BTC/USD (Bitcoin)

## ⚙️ Personalização

### Mudar cores
Edite as variáveis CSS em `style.css`:
```css
:root {
    --primary: #1a1a2e;
    --success: #4CAF50;
    --danger: #f44336;
}
```

### Adicionar novos pares
Em `script.js`, adicione em `sampleSignals`:
```javascript
const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'SEU-PAR-AQUI'];
```

## 🔄 Funcionalidades em Tempo Real

- ⏰ Novos sinais aparecem a cada ~30 segundos (simulado)
- 🔔 Notificações automáticas de novos sinais
- 📊 Gráfico de performance atualiza dinamicamente
- 🎯 Status de conexão em tempo real

## 🛡️ Segurança & Disclaimer

⚠️ **IMPORTANTE:**
- Este é um **simulador educacional**
- Não é um sistema financeiro real
- Use apenas para **prototipagem e aprendizado**
- **Sempre use um broker regulado** para operações reais
- Trading envolve **risco de perda total do capital**

## 🚀 Próximas Melhorias

- [ ] Integração com API de dados reais (Alpha Vantage, Polygon.io)
- [ ] WebSocket para sinais em tempo real
- [ ] Backend com Node.js/Express
- [ ] Banco de dados MongoDB/PostgreSQL
- [ ] Sistema de autenticação
- [ ] Histórico persistente
- [ ] Notificações por email/WhatsApp
- [ ] Dark/Light mode
- [ ] Exportar relatórios em PDF

## 📞 Suporte

Encontrou um bug? [Abra uma issue](https://github.com/Macuizzy/scalper-signal/issues)

## 📄 Licença

MIT License - Libre para usar, modificar e distribuir

---

**Desenvolvido com 💚 para traders scalpers**

### 🔗 Links Úteis
- [Chart.js Documentation](https://www.chartjs.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Pages Deploy](https://pages.github.com/)

### 💻 Tecnologias
- HTML5
- CSS3
- JavaScript (Vanilla)
- Chart.js
- GitHub Pages

---

⭐ Se gostou, deixe uma estrela! ⭐
