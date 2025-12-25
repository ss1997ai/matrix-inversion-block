// Z-Transform Module
// Implements pole-zero analysis and system stability visualization
let poleZeroChart = null;
let impulseResponseChart = null;
let zTransformParams = {
    systemType: 'lowpass',
    poleRadius: 0.8,
    poleAngle: 45
};

function initZtransform() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    if (!poleZeroChart) {
        const ctx1 = document.getElementById('pole-zero-chart');
        if (ctx1) {
            poleZeroChart = new Chart(ctx1, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: '单位圆', // Unit circle
                            data: [],
                            borderColor: 'rgba(0, 0, 0, 0.3)',
                            backgroundColor: 'transparent',
                            showLine: true,
                            pointRadius: 0,
                            borderWidth: 2,
                            borderDash: [5, 5]
                        },
                        {
                            label: '零点', // Zeros
                            data: [],
                            borderColor: 'rgb(75, 192, 192)',
                            backgroundColor: 'rgb(75, 192, 192)',
                            pointRadius: 8,
                            pointStyle: 'circle',
                            showLine: false
                        },
                        {
                            label: '极点', // Poles
                            data: [],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgb(255, 99, 132)',
                            pointRadius: 8,
                            pointStyle: 'crossRot',
                            showLine: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 1,
                    plugins: {
                        title: {
                            display: true,
                            text: '零极点图（Z平面）',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: '实部 (Re)' },
                            min: -1.5,
                            max: 1.5,
                            type: 'linear',
                            position: 'center',
                            grid: {
                                drawOnChartArea: true,
                                color: function(context) {
                                    if (context.tick.value === 0) {
                                        return 'rgba(0, 0, 0, 0.5)';
                                    }
                                    return 'rgba(0, 0, 0, 0.1)';
                                }
                            }
                        },
                        y: {
                            title: { display: true, text: '虚部 (Im)' },
                            min: -1.5,
                            max: 1.5,
                            type: 'linear',
                            position: 'center',
                            grid: {
                                drawOnChartArea: true,
                                color: function(context) {
                                    if (context.tick.value === 0) {
                                        return 'rgba(0, 0, 0, 0.5)';
                                    }
                                    return 'rgba(0, 0, 0, 0.1)';
                                }
                            }
                        }
                    }
                }
            });
        }
        
        const ctx2 = document.getElementById('impulse-response-chart');
        if (ctx2) {
            impulseResponseChart = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '冲激响应 h[n]',
                        data: [],
                        borderColor: 'rgb(153, 102, 255)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 2,
                        tension: 0,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 2.5,
                    plugins: {
                        title: {
                            display: true,
                            text: '系统冲激响应',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: 'n' }
                        },
                        y: {
                            title: { display: true, text: 'h[n]' }
                        }
                    }
                }
            });
        }
    }
    updateZTransform();
}

function updateZTransform() {
    // Generate unit circle
    const unitCircle = [];
    const N_circle = 100;
    for (let i = 0; i <= N_circle; i++) {
        const theta = (i / N_circle) * 2 * Math.PI;
        unitCircle.push({
            x: Math.cos(theta),
            y: Math.sin(theta)
        });
    }
    
    // Generate poles and zeros based on system type
    let poles = [];
    let zeros = [];
    
    const r = zTransformParams.poleRadius;
    const theta = (zTransformParams.poleAngle * Math.PI) / 180;
    
    switch (zTransformParams.systemType) {
        case 'lowpass':
            poles = [
                { x: r * Math.cos(theta), y: r * Math.sin(theta) },
                { x: r * Math.cos(theta), y: -r * Math.sin(theta) }
            ];
            zeros = [
                { x: -1, y: 0 }
            ];
            break;
        case 'highpass':
            poles = [
                { x: r * Math.cos(theta), y: r * Math.sin(theta) },
                { x: r * Math.cos(theta), y: -r * Math.sin(theta) }
            ];
            zeros = [
                { x: 1, y: 0 }
            ];
            break;
        case 'bandpass':
            const theta_bp = Math.PI / 2;
            poles = [
                { x: r * Math.cos(theta_bp), y: r * Math.sin(theta_bp) },
                { x: r * Math.cos(theta_bp), y: -r * Math.sin(theta_bp) }
            ];
            zeros = [
                { x: 1, y: 0 },
                { x: -1, y: 0 }
            ];
            break;
        case 'custom':
            poles = [
                { x: r * Math.cos(theta), y: r * Math.sin(theta) },
                { x: r * Math.cos(theta), y: -r * Math.sin(theta) }
            ];
            zeros = [];
            break;
    }
    
    // Update pole-zero plot
    if (poleZeroChart) {
        poleZeroChart.data.datasets[0].data = unitCircle;
        poleZeroChart.data.datasets[1].data = zeros;
        poleZeroChart.data.datasets[2].data = poles;
        poleZeroChart.update();
    }
    
    // Compute impulse response
    const N_impulse = 50;
    const h = [];
    const n = [];
    
    for (let i = 0; i < N_impulse; i++) {
        n.push(i);
        // Simple impulse response for a second-order system
        const a = r;
        const omega = theta;
        let response = Math.pow(a, i) * Math.cos(omega * i);
        
        if (zTransformParams.systemType === 'highpass') {
            response *= Math.pow(-1, i);
        }
        
        h.push(response);
    }
    
    if (impulseResponseChart) {
        impulseResponseChart.data.labels = n;
        impulseResponseChart.data.datasets[0].data = h;
        impulseResponseChart.update();
    }
    
    // Update stability info
    const isStable = r < 1.0;
    const statusElement = document.getElementById('stability-status');
    if (statusElement) {
        if (isStable) {
            statusElement.textContent = '✓ 稳定（所有极点在单位圆内）';
            statusElement.style.color = '#4caf50';
        } else {
            statusElement.textContent = '✗ 不稳定（存在极点在单位圆外）';
            statusElement.style.color = '#f44336';
        }
    }
}

function updatePoleRadius(value) {
    zTransformParams.poleRadius = parseFloat(value);
    document.getElementById('pole-radius-value').textContent = value;
    updateZTransform();
}

function updatePoleAngle(value) {
    zTransformParams.poleAngle = parseFloat(value);
    document.getElementById('pole-angle-value').textContent = value;
    updateZTransform();
}

window.addEventListener('DOMContentLoaded', function() {
    const systemTypeSelect = document.getElementById('system-type');
    if (systemTypeSelect) {
        systemTypeSelect.addEventListener('change', function() {
            zTransformParams.systemType = this.value;
            updateZTransform();
        });
    }
});
