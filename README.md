# Mezmure Dawit (Psalms of David) Reading App

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern web application for reading and tracking daily Ethiopian Orthodox psalms (Mezmure Dawit) with audio support and progress tracking.

## ✨ Features

- **📅 Daily Reading Schedule**: Follows the traditional 7-day weekly cycle for psalm readings
- **🌍 Bilingual Support**: Psalms available in Amharic (አማርኛ) and English
- **🎵 Audio Player**: Integrated Begena (traditional Ethiopian lyre) audio player for chanting
- **📊 Progress Tracking**: Mark chapters as read and maintain reading streaks
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🌓 Dark/Light Theme**: Toggle between themes for comfortable reading
- **💾 Local Storage**: Progress saved locally in your browser
- **✝️ Ethiopian Cross**: Beautiful Ethiopian Orthodox cross symbol

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/psalm-reading-app.git
   cd psalm-reading-app
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 📖 Usage

### Daily Reading
- The app automatically selects today's reading schedule
- Use the day selector to view readings for other days
- Click on psalm chapters to expand and read verses
- Mark chapters as read by clicking the checkbox

### Audio Features
- Click the Begena player to play traditional chanting
- Audio controls include play/pause, volume, and progress

### Progress Tracking
- Your reading progress is automatically saved
- Maintain reading streaks by reading daily
- View your current streak in the reading streak component

### Themes
- Toggle between light and dark themes using the theme switcher
- Theme preference is saved in local storage

## 🏗️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with [React 19](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives with [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Audio**: HTML5 Audio API

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── begena-player.tsx # Audio player component
│   ├── day-selector.tsx  # Day selection component
│   ├── psalm-display.tsx # Psalm content display
│   ├── reading-streak.tsx# Progress tracking
│   └── ...
├── data/                 # Static data
│   └── psalms.json       # Psalm data in Amharic and English
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and types
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
└── public/               # Static assets
```

## 📊 Data Structure

The psalm data is stored in `data/psalms.json` with the following structure:
- Book information (name in Amharic and English)
- Chapters with sections and verses
- Bilingual text support

## 🛠️ Development

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Building for Production

```bash
pnpm build
pnpm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Ethiopian Orthodox Tewahedo Church for the sacred texts
- Open source community for the tools and libraries used



*May the words of the Psalms bring peace and wisdom to your daily life.* ✝️
