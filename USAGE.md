# 使用指南 / User Guide

## 如何使用本平台 / How to Use This Platform

### 方法一：直接打开（推荐）/ Method 1: Direct Opening (Recommended)

1. 在浏览器中直接打开 `index.html` 文件
   Open the `index.html` file directly in a web browser

2. **重要**: 确保浏览器可以访问 CDN 资源
   **Important**: Ensure your browser can access CDN resources
   - 禁用广告拦截器 / Disable ad blockers
   - 允许访问 cdn.jsdelivr.net
   - 或使用无隐私模式的浏览器

### 方法二：使用本地服务器 / Method 2: Local Server

推荐使用本地服务器以获得最佳体验：
Recommended for the best experience:

```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Python 2
python -m SimpleHTTPServer 8000

# 使用 Node.js (需要先安装 http-server)
npm install -g http-server
http-server -p 8000

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`
Then access `http://localhost:8000` in your browser

## 功能演示 / Feature Demonstrations

### 1. 信号基础 / Signal Fundamentals

点击"信号基础"标签页，您可以：
Click on the "Signal Fundamentals" tab to:

- 选择不同类型的信号（正弦波、方波、锯齿波等）
  Select different signal types (sine, square, sawtooth, etc.)
- 调节频率、幅度和相位参数
  Adjust frequency, amplitude, and phase parameters
- 实时查看波形变化
  View waveform changes in real-time

**操作示例：**
1. 选择"方波 (Square)"
2. 将频率滑块移动到 5 Hz
3. 观察波形图的变化

### 2. 卷积运算 / Convolution

在"卷积"标签页中：
In the "Convolution" tab:

- 选择输入信号类型
  Select input signal type
- 选择系统响应
  Select system response
- 查看卷积结果
  View convolution results

**关键概念：** 卷积展示了信号通过线性时不变系统的输出
**Key Concept:** Convolution shows the output of a signal through an LTI system

### 3. 傅里叶分析 / Fourier Analysis

学习信号的频域表示：
Learn frequency domain representation of signals:

- 时域信号 → 频域谱
  Time domain → Frequency domain
- 理解傅里叶级数
  Understand Fourier series
- 观察谐波成分
  Observe harmonic components

**实验：** 
1. 选择"方波 (Square)"
2. 增加谐波数量到 10
3. 观察频谱中的奇次谐波

### 4. 滤波器设计 / Filter Design

设计和分析数字滤波器：
Design and analyze digital filters:

- 低通滤波器 (LPF) - 保留低频，去除高频
  Low-pass filter - Keep low frequencies, remove high
- 高通滤波器 (HPF) - 保留高频，去除低频
  High-pass filter - Keep high frequencies, remove low
- 带通滤波器 (BPF) - 只保留特定频段
  Band-pass filter - Keep specific frequency band
- 带阻滤波器 (BSF) - 去除特定频段
  Band-stop filter - Remove specific frequency band

**实验步骤：**
1. 选择"低通滤波器"
2. 调节截止频率到 0.3
3. 观察幅度响应和滤波效果

### 5. 采样理论 / Sampling Theory

理解 Nyquist 采样定理：
Understand the Nyquist sampling theorem:

- **采样定理**: 采样率必须 ≥ 2倍信号最高频率
  **Sampling Theorem**: Sampling rate must be ≥ 2× highest signal frequency
- 观察混叠现象
  Observe aliasing phenomenon
- 信号重建
  Signal reconstruction

**演示混叠：**
1. 设置原始信号频率为 10 Hz
2. 设置采样率为 15 Hz (< 2×10)
3. 观察重建信号的失真

### 6. Z变换 / Z-Transform

分析离散时间系统：
Analyze discrete-time systems:

- 零极点图 (Z平面)
  Pole-zero plot (Z-plane)
- 系统稳定性判断
  System stability determination
- 冲激响应
  Impulse response

**稳定性规则：** 所有极点必须在单位圆内
**Stability Rule:** All poles must be inside the unit circle

## 教学建议 / Teaching Recommendations

### 对于教师 / For Teachers

1. **按章节顺序教学** - 从基本信号到复杂变换
   Teach in chapter order - from basic signals to complex transforms

2. **互动演示** - 在课堂上实时调节参数
   Interactive demonstrations - adjust parameters in real-time during class

3. **布置作业** - 让学生探索不同参数组合
   Assign homework - have students explore different parameter combinations

### 对于学生 / For Students

1. **先理论后实践** - 阅读教材后使用本工具验证
   Theory first, then practice - use this tool to verify after reading textbook

2. **记录观察** - 记下参数和结果的关系
   Record observations - note relationships between parameters and results

3. **比较对照** - 将结果与 MATLAB 或教材对比
   Compare and contrast - check results against MATLAB or textbook

## 常见问题 / FAQ

### Q: 为什么看不到图表？
**A:** 可能是 CDN 被阻止。请：
- 检查网络连接
- 禁用广告拦截器
- 尝试使用其他浏览器
- 查看浏览器控制台是否有错误

### Q: Why can't I see the charts?
**A:** CDN might be blocked. Please:
- Check your internet connection
- Disable ad blockers
- Try a different browser
- Check browser console for errors

### Q: 可以离线使用吗？
**A:** 需要下载 Chart.js 和 Math.js 库到本地 `lib/` 文件夹，并修改 HTML 中的引用路径。

### Q: Can I use it offline?
**A:** You need to download Chart.js and Math.js libraries to a local `lib/` folder and modify the references in the HTML.

### Q: 支持移动设备吗？
**A:** 支持，但建议使用平板或电脑以获得更好的体验。

### Q: Does it support mobile devices?
**A:** Yes, but tablets or computers are recommended for better experience.

## 技术支持 / Technical Support

如遇问题，请检查：
If you encounter issues, please check:

1. 浏览器控制台 (F12) 的错误信息
   Browser console (F12) for error messages

2. 网络连接和 CDN 访问
   Network connection and CDN access

3. JavaScript 是否启用
   Whether JavaScript is enabled

## 扩展学习 / Extended Learning

建议配合以下资源使用：
Recommended to use with the following resources:

- 教材：《信号与系统》- 奥本海姆
  Textbook: "Signals and Systems" by Oppenheim
  
- 教材：《数字信号处理》- 普罗科斯
  Textbook: "Digital Signal Processing" by Proakis
  
- MATLAB Signal Processing Toolbox 文档
  MATLAB Signal Processing Toolbox Documentation

---

**祝学习愉快！/ Happy Learning!**
