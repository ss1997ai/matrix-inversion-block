// Simple Chart Library - Fallback for Chart.js
// Provides basic charting functionality when Chart.js is not available

class SimpleChart {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.config = config;
        this.data = config.data;
        this.options = config.options || {};
        this.type = config.type || 'line';
        
        // Set canvas size
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight || 300;
        
        this.draw();
    }
    
    update() {
        this.draw();
    }
    
    // Helper function to add alpha to any color format
    addAlpha(color, alpha) {
        // If already has alpha, return as is
        if (color.includes('rgba')) return color;
        
        // Handle rgb format
        if (color.startsWith('rgb(')) {
            return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
        }
        
        // Handle hex format
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        // Default: return color with default rgba wrapper
        return `rgba(102, 126, 234, ${alpha})`;
    }
    
    draw() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up margins
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        
        // Draw background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw title
        if (this.options.plugins && this.options.plugins.title && this.options.plugins.title.display) {
            ctx.fillStyle = '#333';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.options.plugins.title.text, width / 2, 25);
        }
        
        // Get data
        const datasets = this.data.datasets;
        if (!datasets || datasets.length === 0) return;
        
        // Calculate data range
        let allData = [];
        datasets.forEach(ds => {
            if (ds.data && Array.isArray(ds.data)) {
                if (typeof ds.data[0] === 'object') {
                    allData = allData.concat(ds.data.map(d => d.y));
                } else {
                    allData = allData.concat(ds.data);
                }
            }
        });
        
        const minY = Math.min(...allData);
        const maxY = Math.max(...allData);
        const rangeY = maxY - minY || 1;
        
        // Draw axes
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top);
        ctx.lineTo(margin.left, height - margin.bottom);
        ctx.lineTo(width - margin.right, height - margin.bottom);
        ctx.stroke();
        
        // Draw grid
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = margin.top + (plotHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(margin.left, y);
            ctx.lineTo(width - margin.right, y);
            ctx.stroke();
        }
        
        // Draw Y axis labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        for (let i = 0; i <= 5; i++) {
            const y = margin.top + (plotHeight / 5) * i;
            const value = maxY - (rangeY / 5) * i;
            ctx.fillText(value.toFixed(2), margin.left - 10, y + 4);
        }
        
        // Draw axis labels
        if (this.options.scales) {
            ctx.fillStyle = '#333';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            
            // X axis label
            if (this.options.scales.x && this.options.scales.x.title && this.options.scales.x.title.display) {
                ctx.fillText(this.options.scales.x.title.text, width / 2, height - 10);
            }
            
            // Y axis label
            if (this.options.scales.y && this.options.scales.y.title && this.options.scales.y.title.display) {
                ctx.save();
                ctx.translate(15, height / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(this.options.scales.y.title.text, 0, 0);
                ctx.restore();
            }
        }
        
        // Draw datasets
        datasets.forEach((dataset, index) => {
            const data = dataset.data;
            if (!data || data.length === 0) return;
            
            const color = dataset.borderColor || dataset.backgroundColor || '#667eea';
            
            if (this.type === 'bar' || dataset.type === 'bar') {
                // Draw bars
                const color = dataset.backgroundColor || dataset.borderColor || '#667eea';
                ctx.fillStyle = this.addAlpha(color, 0.6);
                const barWidth = plotWidth / data.length * 0.8;
                
                data.forEach((value, i) => {
                    const y = typeof value === 'object' ? value.y : value;
                    const x = margin.left + (plotWidth / data.length) * (i + 0.5);
                    const barHeight = ((y - minY) / rangeY) * plotHeight;
                    const barY = height - margin.bottom - barHeight;
                    
                    ctx.fillRect(x - barWidth / 2, barY, barWidth, barHeight);
                });
            } else if (this.type === 'scatter' || dataset.showLine === false) {
                // Draw scatter points
                ctx.fillStyle = color;
                
                data.forEach(point => {
                    const x = margin.left + ((point.x - (-1.5)) / 3) * plotWidth;
                    const y = height - margin.bottom - ((point.y - minY) / rangeY) * plotHeight;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, dataset.pointRadius || 4, 0, 2 * Math.PI);
                    ctx.fill();
                });
            } else {
                // Draw line chart
                ctx.strokeStyle = color;
                ctx.lineWidth = dataset.borderWidth || 2;
                ctx.beginPath();
                
                data.forEach((value, i) => {
                    const y = typeof value === 'object' ? value.y : value;
                    const x = typeof value === 'object' ? 
                        margin.left + ((value.x - (-1.5)) / 3) * plotWidth :
                        margin.left + (plotWidth / (data.length - 1)) * i;
                    const plotY = height - margin.bottom - ((y - minY) / rangeY) * plotHeight;
                    
                    if (i === 0) {
                        ctx.moveTo(x, plotY);
                    } else {
                        ctx.lineTo(x, plotY);
                    }
                });
                
                ctx.stroke();
                
                // Fill area if specified
                if (dataset.fill) {
                    const fillColor = dataset.backgroundColor || dataset.borderColor || '#667eea';
                    ctx.fillStyle = this.addAlpha(fillColor, 0.2);
                    ctx.lineTo(width - margin.right, height - margin.bottom);
                    ctx.lineTo(margin.left, height - margin.bottom);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        });
        
        // Draw legend
        if (this.options.plugins && this.options.plugins.legend && this.options.plugins.legend.display) {
            ctx.font = '12px Arial';
            let legendX = width - margin.right - 150;
            let legendY = margin.top + 10;
            
            datasets.forEach((dataset, i) => {
                const color = dataset.borderColor || dataset.backgroundColor || '#667eea';
                
                // Draw color box
                ctx.fillStyle = color;
                ctx.fillRect(legendX, legendY + i * 20, 15, 15);
                
                // Draw label
                ctx.fillStyle = '#333';
                ctx.textAlign = 'left';
                ctx.fillText(dataset.label || 'Data ' + (i + 1), legendX + 20, legendY + i * 20 + 12);
            });
        }
    }
}

// Create Chart wrapper to mimic Chart.js API  
// This will be used as a fallback if Chart.js doesn't load
(function() {
    // Save reference to SimpleChart
    window.SimpleChartLib = SimpleChart;
    
    // Only set up fallback if Chart is not defined initially
    if (typeof Chart === 'undefined') {
        window.Chart = function(canvas, config) {
            if (typeof canvas === 'string') {
                canvas = document.getElementById(canvas);
            } else if (canvas.getContext) {
                // Already a canvas element
            } else {
                // Assume it's a context
                canvas = canvas.canvas;
            }
            
            return new SimpleChart(canvas, config);
        };
        
        console.log('Using SimpleChart fallback library (Chart.js not available)');
    }
    
    // After page loads, check if Chart.js loaded successfully
    window.addEventListener('load', function() {
        // If Chart.js didn't load or is broken, use fallback
        if (typeof Chart === 'undefined' || (typeof Chart.defaults === 'undefined')) {
            window.Chart = function(canvas, config) {
                if (typeof canvas === 'string') {
                    canvas = document.getElementById(canvas);
                } else if (canvas.getContext) {
                    // Already a canvas element
                } else {
                    // Assume it's a context
                    canvas = canvas.canvas;
                }
                
                return new SimpleChart(canvas, config);
            };
            
            console.log('Chart.js failed to load properly, using SimpleChart fallback');
        }
    });
})();
