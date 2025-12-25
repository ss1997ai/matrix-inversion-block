// Fourier Analysis Module
let timeDomainChart = null;
let freqDomainChart = null;
let fourierParams = {
    signalType: 'sine',
    frequency: 2,
    harmonics: 5
};

function initFourier() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    if (!timeDomainChart) {
        const ctx1 = document.getElementById('time-domain-chart');
        if (ctx1) {
            timeDomainChart = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '时域信号',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        borderWidth: 2,
                        tension: 0.1,
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
                            text: '时域信号',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '时间 (s)' }
                        },
                        y: {
                            title: { display: true, text: '幅度' }
                        }
                    }
                }
            });
        }
        
        const ctx2 = document.getElementById('freq-domain-chart');
        if (ctx2) {
            freqDomainChart = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: '幅度谱',
                        data: [],
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgb(153, 102, 255)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5,
                    plugins: {
                        title: {
                            display: true,
                            text: '频域谱（幅度）',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '频率 (Hz)' }
                        },
                        y: {
                            title: { display: true, text: '幅度' },
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
    updateFourier();
}

function updateFourier() {
    const N = 500;
    const Fs = 100; // Sampling frequency
    const T = 1 / Fs;
    const duration = 2;
    
    const t = [];
    const signal = [];
    
    for (let i = 0; i < N; i++) {
        const time = (i / N) * duration;
        t.push(time.toFixed(3));
        
        let value = 0;
        const f0 = fourierParams.frequency;
        
        switch (fourierParams.signalType) {
            case 'sine':
                value = Math.sin(2 * Math.PI * f0 * time);
                break;
            case 'square':
                // Fourier series approximation of square wave
                for (let k = 1; k <= fourierParams.harmonics; k++) {
                    const n = 2 * k - 1;
                    value += (4 / (n * Math.PI)) * Math.sin(2 * Math.PI * n * f0 * time);
                }
                break;
            case 'sawtooth':
                // Fourier series approximation of sawtooth wave
                for (let k = 1; k <= fourierParams.harmonics; k++) {
                    value += (2 / (k * Math.PI)) * Math.pow(-1, k + 1) * Math.sin(2 * Math.PI * k * f0 * time);
                }
                break;
            case 'composite':
                // Composite signal with multiple harmonics
                value = Math.sin(2 * Math.PI * f0 * time) + 
                       0.5 * Math.sin(2 * Math.PI * 2 * f0 * time) + 
                       0.25 * Math.sin(2 * Math.PI * 3 * f0 * time);
                break;
        }
        
        signal.push(value);
    }
    
    // Compute FFT (simplified - showing main harmonics)
    const frequencies = [];
    const magnitudes = [];
    
    if (fourierParams.signalType === 'sine') {
        frequencies.push(fourierParams.frequency.toString());
        magnitudes.push(1.0);
    } else if (fourierParams.signalType === 'composite') {
        for (let k = 1; k <= 3; k++) {
            frequencies.push((k * fourierParams.frequency).toString());
            magnitudes.push(1 / k);
        }
    } else {
        // For square and sawtooth, show harmonics
        for (let k = 1; k <= fourierParams.harmonics; k++) {
            if (fourierParams.signalType === 'square') {
                const n = 2 * k - 1;
                frequencies.push((n * fourierParams.frequency).toString());
                magnitudes.push(4 / (n * Math.PI));
            } else {
                frequencies.push((k * fourierParams.frequency).toString());
                magnitudes.push(2 / (k * Math.PI));
            }
        }
    }
    
    if (timeDomainChart) {
        timeDomainChart.data.labels = t;
        timeDomainChart.data.datasets[0].data = signal;
        timeDomainChart.update();
    }
    
    if (freqDomainChart) {
        freqDomainChart.data.labels = frequencies;
        freqDomainChart.data.datasets[0].data = magnitudes;
        freqDomainChart.update();
    }
}

function updateFourierFreq(value) {
    fourierParams.frequency = parseInt(value);
    document.getElementById('fourier-freq-value').textContent = value;
    updateFourier();
}

function updateHarmonics(value) {
    fourierParams.harmonics = parseInt(value);
    document.getElementById('harmonics-value').textContent = value;
    updateFourier();
}

// Update signal type
window.addEventListener('DOMContentLoaded', function() {
    const fourierSignalSelect = document.getElementById('fourier-signal');
    if (fourierSignalSelect) {
        fourierSignalSelect.addEventListener('change', function() {
            fourierParams.signalType = this.value;
            updateFourier();
        });
    }
});
