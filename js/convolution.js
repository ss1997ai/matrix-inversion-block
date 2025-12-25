// Convolution Module
let convInputChart = null;
let convSystemChart = null;
let convOutputChart = null;

function initConvolution() {
    if (!convInputChart) {
        // Input Signal Chart
        const ctx1 = document.getElementById('conv-input-chart');
        if (ctx1) {
            convInputChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '输入信号 x[n]',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        tension: 0
                    }]
                },
                options: getChartOptions('输入信号 x[n]', 'n', 'x[n]')
            });
        }
        
        // System Response Chart
        const ctx2 = document.getElementById('conv-system-chart');
        if (ctx2) {
            convSystemChart = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '系统响应 h[n]',
                        data: [],
                        borderColor: 'rgb(255, 159, 64)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 2,
                        tension: 0
                    }]
                },
                options: getChartOptions('系统响应 h[n]', 'n', 'h[n]')
            });
        }
        
        // Output Signal Chart
        const ctx3 = document.getElementById('conv-output-chart');
        if (ctx3) {
            convOutputChart = new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '输出信号 y[n] = x[n] * h[n]',
                        data: [],
                        borderColor: 'rgb(153, 102, 255)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 2,
                        tension: 0
                    }]
                },
                options: getChartOptions('卷积输出 y[n] = x[n] * h[n]', 'n', 'y[n]')
            });
        }
    }
    updateConvolution();
}

function getChartOptions(title, xLabel, yLabel) {
    return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
        plugins: {
            title: {
                display: true,
                text: title,
                font: { size: 14 }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: xLabel
                }
            },
            y: {
                title: {
                    display: true,
                    text: yLabel
                }
            }
        }
    };
}

function generateDiscreteSignal(type, length) {
    const signal = new Array(length).fill(0);
    
    switch (type) {
        case 'pulse':
            signal[Math.floor(length / 4)] = 1;
            break;
        case 'step':
            for (let i = Math.floor(length / 4); i < length; i++) {
                signal[i] = 1;
            }
            break;
        case 'rect':
            const start = Math.floor(length / 4);
            const width = Math.floor(length / 4);
            for (let i = start; i < start + width && i < length; i++) {
                signal[i] = 1;
            }
            break;
        case 'exponential':
            const alpha = 0.8;
            for (let i = 0; i < length; i++) {
                signal[i] = Math.pow(alpha, i);
            }
            break;
    }
    
    return signal;
}

function convolve(x, h) {
    const N = x.length + h.length - 1;
    const y = new Array(N).fill(0);
    
    for (let n = 0; n < N; n++) {
        for (let k = 0; k < x.length; k++) {
            if (n - k >= 0 && n - k < h.length) {
                y[n] += x[k] * h[n - k];
            }
        }
    }
    
    return y;
}

function updateConvolution() {
    const inputType = document.getElementById('input-signal').value;
    const systemType = document.getElementById('system-response').value;
    
    const length = 50;
    const x = generateDiscreteSignal(inputType, length);
    const h = generateDiscreteSignal(systemType, length);
    const y = convolve(x, h);
    
    const n_x = Array.from({length: x.length}, (_, i) => i);
    const n_h = Array.from({length: h.length}, (_, i) => i);
    const n_y = Array.from({length: y.length}, (_, i) => i);
    
    if (convInputChart) {
        convInputChart.data.labels = n_x;
        convInputChart.data.datasets[0].data = x;
        convInputChart.update();
    }
    
    if (convSystemChart) {
        convSystemChart.data.labels = n_h;
        convSystemChart.data.datasets[0].data = h;
        convSystemChart.update();
    }
    
    if (convOutputChart) {
        convOutputChart.data.labels = n_y;
        convOutputChart.data.datasets[0].data = y;
        convOutputChart.update();
    }
}
