// Estado da aplicação
let appState = {
    signals: [],
    filteredSignals: [],
    stats: {
        totalSignals: 0,
        hitRate: 0,
        profit: 0
    },
    connected: false
};

// Dados de exemplo
const sampleSignals = [
    {
        id: 1,
        pair: 'EURUSD',
        type: 'CALL',
        entry: 1.0950,
        tp: 1.0965,
        sl: 1.0935,
        timeframe: '5m',
        analysis: 'Rompimento da resistência com volume alto',
        timestamp: new Date(Date.now() - 5 * 60000),
        status: 'ativo',
        result: null
    },
    {
        id: 2,
        pair: 'GBPUSD',
        type: 'PUT',
        entry: 1.2750,
        tp: 1.2730,
        sl: 1.2770,
        timeframe: '15m',
        analysis: 'Suporte testado 3 vezes, possível reversão',
        timestamp: new Date(Date.now() - 15 * 60000),
        status: 'fechado',
        result: 'ganho'
    },
    {
        id: 3,
        pair: 'USDJPY',
        type: 'CALL',
        entry: 149.80,
        tp: 150.20,
        sl: 149.50,
        timeframe: '1h',
        analysis: 'Média móvel 200 atuando como suporte',
        timestamp: new Date(Date.now() - 30 * 60000),
        status: 'fechado',
        result: 'ganho'
    },
    {
        id: 4,
        pair: 'GOLD',
        type: 'CALL',
        entry: 2365.50,
        tp: 2380.00,
        sl: 2355.00,
        timeframe: '5m',
        analysis: 'Pullback em tendência de alta',
        timestamp: new Date(Date.now() - 2 * 60000),
        status: 'ativo',
        result: null
    }
];

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadSignals();
    updateStats();
    initChart();
    simulateConnection();
});

// Inicializar app
function initializeApp() {
    appState.signals = [...sampleSignals];
    appState.filteredSignals = [...appState.signals];
}

// Setup de eventos
function setupEventListeners() {
    // Filtros
    document.getElementById('filter-pair').addEventListener('change', applyFilters);
    document.getElementById('filter-type').addEventListener('change', applyFilters);
    document.getElementById('filter-timeframe').addEventListener('change', applyFilters);
    document.getElementById('btn-clear').addEventListener('click', clearFilters);

    // Form de novo sinal
    document.getElementById('form-signal').addEventListener('submit', handleNewSignal);

    // Modal
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // Botões do modal
    document.getElementById('btn-confirm').addEventListener('click', confirmSignal);
    document.getElementById('btn-cancel').addEventListener('click', () => {
        document.getElementById('modal').classList.remove('show');
    });
}

// Carregar e exibir sinais
function loadSignals() {
    const signalsList = document.getElementById('signals-list');
    signalsList.innerHTML = '';

    if (appState.filteredSignals.length === 0) {
        signalsList.innerHTML = '<p class="loading">Nenhum sinal encontrado</p>';
        return;
    }

    appState.filteredSignals.forEach(signal => {
        const card = createSignalCard(signal);
        signalsList.appendChild(card);
    });
}

// Criar card de sinal
function createSignalCard(signal) {
    const card = document.createElement('div');
    card.className = `signal-card ${signal.type.toLowerCase()}`;
    
    const statusIcon = signal.status === 'ativo' ? '🔴' : '✅';
    const resultColor = signal.result === 'ganho' ? '#4CAF50' : signal.result === 'perda' ? '#f44336' : '';

    card.innerHTML = `
        <div class="signal-header">
            <span class="signal-pair">${statusIcon} ${signal.pair}</span>
            <span class="signal-type ${signal.type.toLowerCase()}">${signal.type}</span>
        </div>
        <div class="signal-details">
            <div class="detail-item">
                <span class="detail-label">Entrada:</span>
                <span class="detail-value">${signal.entry.toFixed(4)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">TP:</span>
                <span class="detail-value" style="color: #4CAF50;">${signal.tp.toFixed(4)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">SL:</span>
                <span class="detail-value" style="color: #f44336;">${signal.sl.toFixed(4)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">TF:</span>
                <span class="detail-value">${signal.timeframe}</span>
            </div>
        </div>
        ${signal.analysis ? `<div style="color: #888; font-size: 0.8rem; margin-top: 8px;">📌 ${signal.analysis.substring(0, 50)}...</div>` : ''}
        <div class="signal-time">${formatTime(signal.timestamp)}</div>
    `;

    card.addEventListener('click', () => showSignalDetails(signal));
    return card;
}

// Mostrar detalhes do sinal
function showSignalDetails(signal) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = `${signal.pair} - ${signal.type}`;
    modalBody.innerHTML = `
        <div style="background: rgba(15, 52, 96, 0.5); padding: 15px; border-radius: 5px;">
            <p><strong>Par:</strong> ${signal.pair}</p>
            <p><strong>Tipo:</strong> <span style="color: ${signal.type === 'CALL' ? '#4CAF50' : '#f44336'}">${signal.type}</span></p>
            <p><strong>Entrada:</strong> ${signal.entry.toFixed(4)}</p>
            <p><strong>Take Profit:</strong> ${signal.tp.toFixed(4)}</p>
            <p><strong>Stop Loss:</strong> ${signal.sl.toFixed(4)}</p>
            <p><strong>Timeframe:</strong> ${signal.timeframe}</p>
            <p><strong>Risco/Recompensa:</strong> 1:${((signal.tp - signal.entry) / (signal.entry - signal.sl)).toFixed(2)}</p>
            <p><strong>Status:</strong> ${signal.status === 'ativo' ? '🔴 Ativo' : '✅ Fechado'}</p>
            ${signal.result ? `<p><strong>Resultado:</strong> ${signal.result === 'ganho' ? '✅ Ganho' : '❌ Perda'}</p>` : ''}
            <p style="margin-top: 15px; border-top: 1px solid rgba(0, 255, 150, 0.2); padding-top: 10px;">
                <strong>Análise:</strong><br/>
                ${signal.analysis || 'Sem análise adicional'}
            </p>
        </div>
    `;

    modal.classList.add('show');
}

// Confirmar entrada no sinal
function confirmSignal() {
    alert('✅ Entrada confirmada! Boa sorte na operação!');
    document.getElementById('modal').classList.remove('show');
}

// Aplicar filtros
function applyFilters() {
    const pair = document.getElementById('filter-pair').value;
    const type = document.getElementById('filter-type').value;
    const timeframe = document.getElementById('filter-timeframe').value;

    appState.filteredSignals = appState.signals.filter(signal => {
        return (!pair || signal.pair === pair) &&
               (!type || signal.type === type) &&
               (!timeframe || signal.timeframe === timeframe);
    });

    loadSignals();
}

// Limpar filtros
function clearFilters() {
    document.getElementById('filter-pair').value = '';
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-timeframe').value = '';
    appState.filteredSignals = [...appState.signals];
    loadSignals();
}

// Adicionar novo sinal
function handleNewSignal(e) {
    e.preventDefault();

    const newSignal = {
        id: appState.signals.length + 1,
        pair: document.getElementById('pair').value,
        type: document.getElementById('type').value,
        entry: parseFloat(document.getElementById('entry').value),
        tp: parseFloat(document.getElementById('tp').value),
        sl: parseFloat(document.getElementById('sl').value),
        timeframe: document.getElementById('timeframe').value,
        analysis: document.getElementById('analysis').value,
        timestamp: new Date(),
        status: 'ativo',
        result: null
    };

    appState.signals.unshift(newSignal);
    appState.filteredSignals = [...appState.signals];
    
    // Notificação
    showNotification(`✅ Novo sinal adicionado: ${newSignal.pair} ${newSignal.type}`);
    
    // Limpar form
    e.target.reset();
    
    loadSignals();
    updateStats();
}

// Atualizar estatísticas
function updateStats() {
    const ativosCount = appState.signals.filter(s => s.status === 'ativo').length;
    const ganhos = appState.signals.filter(s => s.result === 'ganho').length;
    const perdas = appState.signals.filter(s => s.result === 'perda').length;
    const total = ganhos + perdas;

    document.getElementById('total-signals').textContent = appState.signals.length;
    document.getElementById('hit-rate').textContent = total > 0 ? `${((ganhos / total) * 100).toFixed(1)}%` : '0%';
    document.getElementById('last-signal').textContent = appState.signals.length > 0 ? formatTime(appState.signals[0].timestamp) : '-';
    
    const profit = (ganhos * 100) - (perdas * 50);
    const profitElement = document.getElementById('profit');
    profitElement.textContent = `R$ ${profit.toFixed(2)}`;
    profitElement.style.color = profit >= 0 ? '#4CAF50' : '#f44336';
}

// Formatar tempo
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    
    return date.toLocaleDateString('pt-BR');
}

// Simular conexão
function simulateConnection() {
    const indicator = document.getElementById('connection');
    const statusText = document.getElementById('status-text');

    setTimeout(() => {
        appState.connected = true;
        indicator.classList.add('connected');
        statusText.textContent = 'Conectado';
    }, 1500);

    // Simular novos sinais a cada 30 segundos
    setInterval(() => {
        if (Math.random() > 0.7) {
            const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'GOLD', 'BTC', 'OIL'];
            const types = ['CALL', 'PUT'];
            const timeframes = ['1m', '5m', '15m', '1h'];

            const newSignal = {
                id: appState.signals.length + 1,
                pair: pairs[Math.floor(Math.random() * pairs.length)],
                type: types[Math.floor(Math.random() * types.length)],
                entry: 1000 + Math.random() * 1000,
                tp: 1050 + Math.random() * 1000,
                sl: 950 + Math.random() * 1000,
                timeframe: timeframes[Math.floor(Math.random() * timeframes.length)],
                analysis: 'Sinal automático gerado',
                timestamp: new Date(),
                status: 'ativo',
                result: null
            };

            appState.signals.unshift(newSignal);
            applyFilters();
            updateStats();
            showNotification(`📊 Novo sinal: ${newSignal.pair} ${newSignal.type}`);
        }
    }, 30000);
}

// Notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 150, 0.2);
        border: 2px solid #00ff96;
        color: #00ff96;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Gráfico de performance
function initChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    const ganhos = appState.signals.filter(s => s.result === 'ganho').length;
    const perdas = appState.signals.filter(s => s.result === 'perda').length;
    const pendentes = appState.signals.filter(s => s.status === 'ativo').length;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ganhos', 'Perdas', 'Pendentes'],
            datasets: [{
                data: [ganhos, perdas, pendentes],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.6)',
                    'rgba(244, 67, 54, 0.6)',
                    'rgba(33, 150, 243, 0.6)'
                ],
                borderColor: [
                    '#4CAF50',
                    '#f44336',
                    '#2196F3'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ecf0f1',
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

// Animação de slide
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
