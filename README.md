# Pixel Picker - Chrome Extension

A color picker extension that allows you to select and copy colors from any webpage

## Features

- 🎨 **Eyedropper Tool**: Pick colors from any webpage using the native browser API
- 🔄 **Format Conversion**: Instantly convert between HEX, HSL, and RGB formats
- 📋 **Copy to Clipboard**: One-click copying for all color formats
- 🕒 **Recent Colors**: Automatic storage of recently picked colors
- 📱 **Responsive Design**: Clean, modern interface optimized for extension popup
- ⚡ **Fast & Lightweight**: Built with Svelte for optimal performance

## Installation

1. Clone or download this project
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the extension
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the project folder
7. The extension icon will appear in your toolbar

## Usage

1. Click the Pixel Picker icon in your Chrome toolbar
2. Click "Pick Color" to activate the eyedropper tool
3. Click on any color on the webpage to select it
4. View the color in different formats (HEX, HSL, RGB)
5. Click any format to copy it to your clipboard
6. Access recently picked colors from the Recent section

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check
```

## Browser Support

- Chrome 95+ (requires EyeDropper API support)
- Other Chromium-based browsers with EyeDropper API

## License

MIT License