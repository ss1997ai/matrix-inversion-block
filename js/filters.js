// Filter Design Module
let magnitudeChart = null;
let phaseChart = null;
let filterDemoChart = null;
let filterParams = {
    type: 'lowpass',
    cutoff: 0.25,
    order: 4
};

function initFilters() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    if (!magnitudeChart) {
        const ctx1 = document.getElementById('magnitude-response-chart');
        if (ctx1) {
            magnitudeChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '幅度响应 (dB)',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5,
                    plugins: {
                        title: {
                            display: true,
                            text: '幅度响应',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '归一化频率' }
                        },
                        y: {
                            title: { display: true, text: '幅度 (dB)' }
                        }
                    }
                }
            });
        }
        
        const ctx2 = document.getElementById('phase-response-chart');
        if (ctx2) {
            phaseChart = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '相位响应 (度)',
                        data: [],
                        borderColor: 'rgb(255, 159, 64)',
                        backgroundColor: 'rgba(255, 159, 64, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5,
                    plugins: {
                        title: {
                            display: true,
                            text: '相位响应',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '归一化频率' }
                        },
                        y: {
                            title: { display: true, text: '相位 (度)' }
                        }
                    }
                }
            });
        }
        
        const ctx3 = document.getElementById('filter-demo-chart');
        if (ctx3) {
            filterDemoChart = new Chart(ctx3, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: '原始信号',
                            data: [],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0
                        },
                        {
                            label: '滤波后信号',
                            data: [],
                            borderColor: 'rgb(75, 192, 192)',
                            backgroundColor: 'rgba(75, 192, 192, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5,
                    plugins: {
                        title: {
                            display: true,
                            text: '滤波效果演示',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '样本' }
                        },
                        y: {
                            title: { display: true, text: '幅度' }
                        }
                    }
                }
            });
        }
    }
    updateFilter();
}

function butterworth(order, cutoff, type) {
    // Simplified Butterworth filter frequency response
    const N = 500;
    const frequencies = [];
    const magnitude = [];
    const phase = [];
    
    for (let i = 0; i < N; i++) {
        const f = i / N;
        frequencies.push(f.toFixed(3));
        
        let H = 0;
        let phi = 0;
        
        switch (type) {
            case 'lowpass':
                H = 1 / Math.sqrt(1 + Math.pow(f / cutoff, 2 * order));
                phi = -order * Math.atan(f / cutoff) * (180 / Math.PI);
                break;
            case 'highpass':
                H = 1 / Math.sqrt(1 + Math.pow(cutoff / (f + 0.001), 2 * order));
                phi = order * Math.atan(cutoff / (f + 0.001)) * (180 / Math.PI);
                break;
            case 'bandpass':
                const center = cutoff;
                const bandwidth = 0.1;
                const Q = center / bandwidth;
                const delta = f - center;
                H = 1 / Math.sqrt(1 + Math.pow(Q * delta / (center + 0.001), 2 * order));
                phi = -Math.atan(Q * delta / (center + 0.001)) * (180 / Math.PI);
                break;
            case 'bandstop':
                const centerStop = cutoff;
                const bandwidthStop = 0.1;
                const QStop = centerStop / bandwidthStop;
                const deltaStop = f - centerStop;
                H = Math.sqrt(1 + Math.pow(QStop * deltaStop / (centerStop + 0.001), 2 * order)) /
                    Math.sqrt(1 + Math.pow(QStop * deltaStop / (centerStop + 0.001), 2 * order) + 1);
                phi = 0;
                break;
        }
        
        const H_dB = 20 * Math.log10(H + 0.0001);
        magnitude.push(H_dB);
        phase.push(phi);
    }
    
    return { frequencies, magnitude, phase };
}

function updateFilter() {
    const response = butterworth(filterParams.order, filterParams.cutoff, filterParams.type);
    
    if (magnitudeChart) {
        magnitudeChart.data.labels = response.frequencies;
        magnitudeChart.data.datasets[0].data = response.magnitude;
        magnitudeChart.update();
    }
    
    if (phaseChart) {
        phaseChart.data.labels = response.frequencies;
        phaseChart.data.datasets[0].data = response.phase;
        phaseChart.update();
    }
    
    // Demo signal: mixture of low and high frequency
    const N = 200;
    const original = [];
    const filtered = [];
    const labels = [];
    
    for (let i = 0; i < N; i++) {
        labels.push(i);
        const t = i / 20;
        const lowFreq = Math.sin(2 * Math.PI * 0.5 * t);
        const highFreq = 0.5 * Math.sin(2 * Math.PI * 5 * t);
        original.push(lowFreq + highFreq);
        
        // Simple filtering simulation
        let filtered_val = 0;
        if (filterParams.type === 'lowpass') {
            filtered_val = lowFreq; // Keep low frequency
        } else if (filterParams.type === 'highpass') {
            filtered_val = highFreq; // Keep high frequency
        } else if (filterParams.type === 'bandpass') {
            filtered_val = lowFreq * 0.5; // Partial
        } else {
            filtered_val = lowFreq + highFreq * 0.1; // Reduce high freq
        }
        filtered.push(filtered_val);
    }
    
    if (filterDemoChart) {
        filterDemoChart.data.labels = labels;
        filterDemoChart.data.datasets[0].data = original;
        filterDemoChart.data.datasets[1].data = filtered;
        filterDemoChart.update();
    }
}

function updateCutoff(value) {
    filterParams.cutoff = parseFloat(value);
    document.getElementById('cutoff-value').textContent = value;
    updateFilter();
}

function updateOrder(value) {
    const orderValue = Math.max(2, Math.floor(parseFloat(value)));
    filterParams.order = orderValue;
    document.getElementById('order-value').textContent = orderValue;
    updateFilter();
}

window.addEventListener('DOMContentLoaded', function() {
    const filterTypeSelect = document.getElementById('filter-type');
    if (filterTypeSelect) {
        filterTypeSelect.addEventListener('change', function() {
            filterParams.type = this.value;
            updateFilter();
        });
    }
});
