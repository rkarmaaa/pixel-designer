# Pixel-Designer

A lightning-fast, ultra-lightweight desktop application to convert between pixels and centimeters instantly. Designed with a sleek, Figma-inspired dark mode UI.

## ✨ Features

- **Instant Conversion**: Type a value in either pixels or centimeters and get the exact conversion instantly.
- **Figma Preset**: Uses the standard 72 DPI ratio used by Figma (595x842 for A4) for perfect print/web alignment.
- **Keyboard Navigation**: Press `TAB` to switch quickly between inputs and automatically select the text.
- **Offline First**: All fonts (Inter & Roboto Mono) are bundled locally. No latency, no tracking.
- **Cross-Platform**: Built with Vite, React, and Electron.

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Electron (electron-builder)
- CSS (Vanilla, CSS Variables)

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run in development mode:
   ```bash
   npm run electron:dev
   ```

## 📦 Build

To build the executable for your platform (Windows/macOS):

```bash
npm run electron:build
```

The output will be available in the `dist-electron` directory.
