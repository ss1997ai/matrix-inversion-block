// Signals Module
let signalChart = null;
let signalParams = {
    type: 'sine',
    frequency: 1,
    amplitude: 1,
    phase: 0
};

function initSignals() {
    if (!signalChart) {
        const ctx = document.getElementById('signal-chart');
        if (ctx) {
            signalChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '信号波形',
                        data: [],
                        borderColor: 'rgb(102, 126, 234)',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2,
                    plugins: {
                        title: {
                            display: true,
                            text: '时域信号',
                            font: { size: 16 }
                        },
                        legend: {
                            display: true
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: '时间 (s)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '幅度'
                            }
                        }
                    }
                }
            });
        }
    }
    generateSignal();
}

function generateSignal() {
    const type = document.getElementById('signal-type').value;
    signalParams.type = type;
    
    const N = 500; // Number of points
    const duration = 2; // seconds
    const t = [];
    const signal = [];
    
    for (let i = 0; i < N; i++) {
        const time = (i / N) * duration;
        t.push(time.toFixed(4));
        
        let value = 0;
        const omega = 2 * Math.PI * signalParams.frequency;
        const phaseRad = (signalParams.phase * Math.PI) / 180;
        
        switch (type) {
            case 'sine':
                value = signalParams.amplitude * Math.sin(omega * time + phaseRad);
                break;
            case 'cosine':
                value = signalParams.amplitude * Math.cos(omega * time + phaseRad);
                break;
            case 'square':
                value = signalParams.amplitude * Math.sign(Math.sin(omega * time + phaseRad));
                break;
            case 'sawtooth':
                const period = 1 / signalParams.frequency;
                value = signalParams.amplitude * (2 * ((time / period) % 1) - 1);
                break;
            case 'triangle':
                const t_norm = ((time * signalParams.frequency) % 1);
                value = signalParams.amplitude * (4 * Math.abs(t_norm - 0.5) - 1);
                break;
            case 'pulse':
                const pulseWidth = 0.1 / signalParams.frequency;
                value = ((time % (1/signalParams.frequency)) < pulseWidth) ? signalParams.amplitude : 0;
                break;
            case 'exponential':
                value = signalParams.amplitude * Math.exp(-signalParams.frequency * time);
                break;
        }
        
        signal.push(value);
    }
    
    if (signalChart) {
        signalChart.data.labels = t;
        signalChart.data.datasets[0].data = signal;
        signalChart.data.datasets[0].label = getSignalName(type);
        signalChart.update();
    }
}

function getSignalName(type) {
    const names = {
        'sine': '正弦波',
        'cosine': '余弦波',
        'square': '方波',
        'sawtooth': '锯齿波',
        'triangle': '三角波',
        'pulse': '脉冲信号',
        'exponential': '指数信号'
    };
    return names[type] || '信号';
}

function updateFrequency(value) {
    signalParams.frequency = parseFloat(value);
    document.getElementById('freq-value').textContent = value;
    generateSignal();
}

function updateAmplitude(value) {
    signalParams.amplitude = parseFloat(value);
    document.getElementById('amp-value').textContent = value;
    generateSignal();
}

function updatePhase(value) {
    signalParams.phase = parseFloat(value);
    document.getElementById('phase-value').textContent = value;
    generateSignal();
}
