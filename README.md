# Pixels to Inches Converter

A modern, responsive web application for converting pixels to inches, built with Next.js 15 and TypeScript.

## Features

- 🔄 Real-time pixel to inch conversion
- 📱 Responsive design for all devices
- 🌐 Multi-language support (i18n ready)
- ⚡ Fast and lightweight
- 🎨 Modern UI with Tailwind CSS
- 🔍 SEO optimized

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Deployment**: Vercel (recommended)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pixels-to-inches/
├── pages/                   # Next.js Pages (页面路由)
│   ├── _app.tsx            # App wrapper
│   └── index.tsx           # Home page
├── components/              # Reusable React components (可复用组件)
├── lib/                     # Utility functions (工具函数)
├── styles/                  # Global styles (全局样式)
│   └── globals.css         # Main CSS file
├── public/                  # Static assets (静态资源)
│   ├── locales/            # Translation files (翻译文件)
│   │   └── en.json         # English translations
│   └── favicon.ico         # Favicon
├── i18n.ts                 # Internationalization config (国际化配置)
└── ...config files         # Configuration files (配置文件)
```

## Development Roadmap

- [x] Project setup and architecture
- [ ] Core conversion functionality
- [ ] UI/UX implementation
- [ ] SEO optimization
- [ ] Multi-language support
- [ ] Performance optimization
- [ ] Testing and deployment

## License

MIT License