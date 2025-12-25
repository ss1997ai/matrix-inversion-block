# 信号与系统 - 交互式学习平台
# Signals and Systems - Interactive Learning Platform

一个类似 MATLAB 信号处理工具箱的交互式网页应用，用于学习和理解信号与系统以及数字信号处理的核心概念。

An interactive web application similar to MATLAB Signal Processing Toolbox for learning and understanding core concepts of Signals and Systems and Digital Signal Processing.

## 功能特点 / Features

### 第一章：信号基础 / Chapter 1: Signal Fundamentals
- 正弦波、余弦波 / Sine and Cosine waves
- 方波、锯齿波、三角波 / Square, Sawtooth, Triangle waves
- 脉冲信号、指数信号 / Pulse and Exponential signals
- 实时调节频率、幅度、相位 / Real-time adjustment of frequency, amplitude, phase

### 第二章：卷积运算 / Chapter 2: Convolution
- 离散卷积可视化 / Discrete convolution visualization
- 输入信号与系统响应 / Input signal and system response
- 卷积输出实时计算 / Real-time convolution output calculation
- 多种信号类型选择 / Multiple signal type options

### 第三章：傅里叶分析 / Chapter 3: Fourier Analysis
- 时域信号显示 / Time domain signal display
- 频域谱分析 / Frequency domain spectrum analysis
- 傅里叶级数展开 / Fourier series expansion
- 谐波分析 / Harmonic analysis

### 第四章：数字滤波器设计 / Chapter 4: Digital Filter Design
- 低通、高通、带通、带阻滤波器 / Low-pass, High-pass, Band-pass, Band-stop filters
- 幅度响应和相位响应 / Magnitude and phase response
- Butterworth 滤波器设计 / Butterworth filter design
- 滤波效果实时演示 / Real-time filtering demonstration

### 第五章：采样理论 / Chapter 5: Sampling Theory
- 采样过程可视化 / Sampling process visualization
- Nyquist 采样定理 / Nyquist sampling theorem
- 混叠现象演示 / Aliasing demonstration
- 信号重建 / Signal reconstruction

### 第六章：Z变换 / Chapter 6: Z-Transform
- 零极点图 / Pole-zero plot
- 系统稳定性分析 / System stability analysis
- 冲激响应 / Impulse response
- 多种系统类型 / Multiple system types

## 技术栈 / Technology Stack

- **HTML5** - 结构 / Structure
- **CSS3** - 样式和响应式设计 / Styling and responsive design
- **JavaScript (ES6+)** - 交互逻辑 / Interactive logic
- **Chart.js** - 数据可视化 / Data visualization
- **Math.js** - 数学运算 / Mathematical computations

## 使用方法 / Usage

1. 直接在浏览器中打开 `index.html` 文件
   Open `index.html` directly in a web browser

2. 或使用本地服务器（推荐）：
   Or use a local server (recommended):
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx http-server
   ```

3. 在浏览器中访问 `http://localhost:8000`
   Access `http://localhost:8000` in your browser

## 项目结构 / Project Structure

```
matrix-inversion-block/
├── index.html              # 主页面 / Main page
├── css/
│   └── styles.css         # 样式文件 / Stylesheet
├── js/
│   ├── navigation.js      # 导航系统 / Navigation system
│   ├── signals.js         # 信号生成 / Signal generation
│   ├── convolution.js     # 卷积运算 / Convolution
│   ├── fourier.js         # 傅里叶分析 / Fourier analysis
│   ├── filters.js         # 滤波器设计 / Filter design
│   ├── sampling.js        # 采样理论 / Sampling theory
│   └── ztransform.js      # Z变换 / Z-transform
└── README.md              # 项目说明 / Documentation
```

## 教学应用 / Educational Applications

本平台特别适合：
This platform is particularly suitable for:

- 工程学生学习信号与系统课程 / Engineering students learning Signals and Systems
- 数字信号处理课程的辅助教学 / Supplementary teaching for Digital Signal Processing courses
- 理解抽象概念的可视化工具 / Visualization tool for understanding abstract concepts
- 快速验证信号处理算法 / Quick verification of signal processing algorithms

## 浏览器兼容性 / Browser Compatibility

- Chrome (推荐 / Recommended)
- Firefox
- Safari
- Edge

需要支持 ES6+ 和 Canvas API
Requires ES6+ and Canvas API support

## 未来改进 / Future Improvements

- [ ] 添加更多信号类型 / Add more signal types
- [ ] 实现音频信号处理 / Implement audio signal processing
- [ ] 添加实时麦克风输入 / Add real-time microphone input
- [ ] 支持信号导出 / Support signal export
- [ ] 添加更多滤波器类型 / Add more filter types
- [ ] 实现2D信号处理（图像） / Implement 2D signal processing (images)
- [ ] 添加练习题和测验 / Add exercises and quizzes

## 贡献 / Contributing

欢迎提交问题和拉取请求！
Issues and pull requests are welcome!

## 许可证 / License

MIT License

## 致谢 / Acknowledgments

本项目受经典教材启发：
This project is inspired by classic textbooks:
- "Signals and Systems" by Alan V. Oppenheim
- "Digital Signal Processing" by John G. Proakis
- MATLAB Signal Processing Toolbox

---

**作者 / Author:** Signal Processing Educational Platform Team  
**最后更新 / Last Updated:** 2024-12-25
