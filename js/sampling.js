// Sampling Theory Module
let samplingChart = null;
let reconstructedChart = null;
let samplingParams = {
    originalFreq: 5,
    samplingRate: 20
};

function initSampling() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    if (!samplingChart) {
        const ctx1 = document.getElementById('sampling-chart');
        if (ctx1) {
            samplingChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: '原始信号',
                            data: [],
                            borderColor: 'rgb(75, 192, 192)',
                            backgroundColor: 'rgba(75, 192, 192, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                            type: 'line'
                        },
                        {
                            label: '采样点',
                            data: [],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderWidth: 0,
                            pointRadius: 5,
                            pointStyle: 'circle',
                            showLine: false,
                            type: 'scatter'
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
                            text: '采样过程',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '时间 (s)' },
                            type: 'linear',
                            position: 'bottom'
                        },
                        y: {
                            title: { display: true, text: '幅度' }
                        }
                    }
                }
            });
        }
        
        const ctx2 = document.getElementById('reconstructed-chart');
        if (ctx2) {
            reconstructedChart = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: '原始信号',
                            data: [],
                            borderColor: 'rgba(75, 192, 192, 0.5)',
                            backgroundColor: 'rgba(75, 192, 192, 0.1)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            tension: 0.4,
                            pointRadius: 0
                        },
                        {
                            label: '重建信号',
                            data: [],
                            borderColor: 'rgb(153, 102, 255)',
                            backgroundColor: 'rgba(153, 102, 255, 0.1)',
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
                            text: '信号重建',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '时间 (s)' },
                            type: 'linear',
                            position: 'bottom'
                        },
                        y: {
                            title: { display: true, text: '幅度' }
                        }
                    }
                }
            });
        }
    }
    updateSampling();
}

function updateSampling() {
    const N_continuous = 500;
    const duration = 1.0;
    const f_signal = samplingParams.originalFreq;
    const f_sampling = samplingParams.samplingRate;
    
    // Original continuous signal
    const t_continuous = [];
    const signal_continuous = [];
    
    for (let i = 0; i < N_continuous; i++) {
        const t = (i / N_continuous) * duration;
        t_continuous.push(t);
        signal_continuous.push(Math.sin(2 * Math.PI * f_signal * t));
    }
    
    // Sampled signal
    const N_samples = Math.floor(f_sampling * duration);
    const sampledData = [];
    
    for (let i = 0; i < N_samples; i++) {
        const t = i / f_sampling;
        const value = Math.sin(2 * Math.PI * f_signal * t);
        sampledData.push({ x: t, y: value });
    }
    
    // Reconstructed signal (zero-order hold approximation)
    const reconstructed = [];
    for (let i = 0; i < N_continuous; i++) {
        const t = (i / N_continuous) * duration;
        const sample_index = Math.floor(t * f_sampling);
        if (sample_index < sampledData.length) {
            reconstructed.push(sampledData[sample_index].y);
        } else {
            reconstructed.push(0);
        }
    }
    
    // Update sampling chart
    if (samplingChart) {
        samplingChart.data.datasets[0].data = signal_continuous;
        samplingChart.data.labels = t_continuous;
        samplingChart.data.datasets[1].data = sampledData;
        samplingChart.update();
    }
    
    // Update reconstructed chart
    if (reconstructedChart) {
        reconstructedChart.data.labels = t_continuous;
        reconstructedChart.data.datasets[0].data = signal_continuous;
        reconstructedChart.data.datasets[1].data = reconstructed;
        reconstructedChart.update();
    }
    
    // Update Nyquist info
    const nyquistFreq = f_sampling / 2;
    document.getElementById('nyquist-freq').textContent = nyquistFreq.toFixed(1) + ' Hz';
    
    const statusElement = document.getElementById('sampling-status');
    if (f_signal <= nyquistFreq) {
        statusElement.textContent = '✓ 满足采样定理（无混叠）';
        statusElement.style.color = '#4caf50';
    } else {
        statusElement.textContent = '✗ 不满足采样定理（存在混叠）';
        statusElement.style.color = '#f44336';
    }
}

function updateOriginalFreq(value) {
    samplingParams.originalFreq = parseFloat(value);
    document.getElementById('orig-freq-value').textContent = value;
    updateSampling();
}

function updateSamplingRate(value) {
    samplingParams.samplingRate = parseFloat(value);
    document.getElementById('sampling-rate-value').textContent = value;
    updateSampling();
}
