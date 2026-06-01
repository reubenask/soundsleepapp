# 🌙 睡眠下班 · Sleep Off Duty

> **让大脑准时下班，让身体安心入睡**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)

---

## 📖 项目简介

**睡眠下班**是一款专为 **25–45 岁职场人** 设计的移动端睡眠辅助 Web App 原型。

现代职场人面临的睡眠困境不只是"睡不着"，而是**大脑无法从工作模式切换到休息模式**——脑内加班、报复性熬夜、睡前焦虑、夜醒后难以再入睡……这些问题的根源是心理状态，而非身体疲劳。

本产品的核心理念是：**不评判、不施压、不制造焦虑**，只是陪伴你完成从"工作模式"到"睡眠模式"的平静过渡。

---

## ✨ 核心功能

### 🔒 睡前关闭仪式
引导用户完成「大脑下班」的结束仪式，通过逐步放下今日事务，在心理层面为睡眠划定边界。

### 📝 焦虑卸载
提供一个安全的空间，把脑中盘旋的担忧、待办、情绪写下来，从头脑转移到纸面，减轻入睡前的心理负担。

### 🌬️ 入睡训练
结合 **4-2-6 呼吸法**动画引导与 ASMR/自然环境声音频，帮助神经系统从激活状态平稳过渡到放松状态。支持定时关闭（15/30/60 分钟）。

### 🎧 助眠声音库
精选 10 大分类 ASMR 与自然环境声，包括：
- **ASMR 触感声**：刷子刮擦、轻柔敲击、耳部清洁、梳头按摩、手帐胶带、史莱姆、护肤 SPA
- **生活环境声**：厨房烹饪、机械键盘、咀嚼音、洗衣机、翻书声、磨咖啡豆、壁炉噼啪

### 🌛 夜醒模式
专为夜间醒来设计的快速安抚页面，低亮度、低刺激，帮助快速重新入睡。

### ☀️ 早晨记录
简洁的晨间睡眠质量记录，追踪入睡时间、睡眠感受和晨间状态。

### 📊 周复盘
可视化一周睡眠趋势，提供个性化睡眠建议，帮助用户了解自己的睡眠规律。

---

## 🖼️ 页面预览

| 启动页 | 状态选择 | 首页 |
|--------|----------|------|
| 品牌引导动画 | 今晚状态个性化推荐 | 睡前行动中心 |

| 睡前仪式 | 入睡训练 | 助眠声音 |
|----------|----------|----------|
| 大脑下班引导 | 呼吸动画 + 音频 | 10分类声音库 |

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | 前端框架 |
| TypeScript | 5 | 类型安全 |
| Vite | 7 | 构建工具 |
| Tailwind CSS | 4 | 原子化样式 |
| shadcn/ui | latest | UI 组件库 |
| Framer Motion | latest | 动画效果 |
| Wouter | 3 | 轻量路由 |
| Lucide React | latest | 图标库 |

---

## 🎨 设计系统

### 色彩
| 名称 | 色值 | 用途 |
|------|------|------|
| 深夜蓝 | `#1A1F35` | 主背景色 |
| 暖月光金 | `#C9A66B` | 主强调色 |
| 晨间米白 | `#F7F1E5` | 文字/卡片色 |
| 星空紫 | `#2D2B55` | 次级背景 |

### 字体
- **主字体**：Noto Serif SC（Google Fonts）
- **风格**：深色主题，大圆角卡片，宽松留白，低压力视觉语言

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- pnpm >= 8

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/your-username/sleep-off-duty-webapp.git
cd sleep-off-duty-webapp

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

访问 `http://localhost:3000` 查看应用。

### 构建生产版本

```bash
pnpm run build
```

构建产物输出至 `dist/` 目录。

---

## 📁 项目结构

```
sleep-off-duty-webapp/
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx              # 路由配置（10个页面）
│       ├── main.tsx             # 应用入口
│       ├── index.css            # 全局样式与设计 Token
│       ├── pages/               # 页面组件
│       │   ├── SplashPage.tsx       # 启动页
│       │   ├── StatusSelectPage.tsx # 状态选择
│       │   ├── HomePage.tsx         # 首页·睡前行动中心
│       │   ├── ShutdownRitualPage.tsx # 睡前关闭仪式
│       │   ├── AnxietyUnloadPage.tsx  # 焦虑卸载
│       │   ├── SleepTrainingPage.tsx  # 入睡训练
│       │   ├── ASMRPage.tsx           # 助眠声音库
│       │   ├── NightWakePage.tsx      # 夜醒模式
│       │   ├── MorningLogPage.tsx     # 早晨记录
│       │   └── WeeklyReviewPage.tsx   # 周复盘
│       ├── components/
│       │   └── ui/              # shadcn/ui 组件
│       ├── contexts/            # React Context
│       ├── hooks/               # 自定义 Hooks
│       └── lib/                 # 工具函数
├── server/                      # 占位（静态项目）
├── shared/                      # 共享类型定义
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 💡 产品理念

> 这不是一款让你"管理睡眠"的工具。  
> 它不做打卡，不评分，不制造焦虑。  
> 它只是陪伴你，在该休息的时候，轻轻说一声：**下班了。**

本产品遵循以下设计原则：
- **低压力**：没有任何考核和打卡机制
- **不评判**：接受每一种睡眠状态，不定义"好睡眠"的标准
- **夜间友好**：深色界面，低亮度，减少蓝光刺激
- **渐进引导**：从状态选择开始，个性化推荐当晚的放松路径

---

## 📄 许可证

MIT License © 2026

---

*原型版本 v1.0 · 构建于 Manus AI*
