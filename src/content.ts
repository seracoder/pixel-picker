// Content script for color picker extension
console.log('Color Picker Pro content script loaded')

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractColors') {
    const colors = extractColorsFromPage()
    sendResponse({ colors })
  }
})

function extractColorsFromPage(): string[] {
  const colors = new Set<string>()
  const elements = document.querySelectorAll('*')
  
  elements.forEach(element => {
    const computedStyle = getComputedStyle(element)
    const backgroundColor = computedStyle.backgroundColor
    const color = computedStyle.color
    const borderColor = computedStyle.borderColor
    
    [backgroundColor, color, borderColor].forEach(colorValue => {
      if (colorValue && colorValue !== 'rgba(0, 0, 0, 0)' && colorValue !== 'transparent') {
        const hex = rgbToHex(colorValue)
        if (hex) colors.add(hex)
      }
    })
  })
  
  return Array.from(colors).slice(0, 50) // Limit to 50 colors
}

function rgbToHex(rgb: string): string | null {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    const [, r, g, b] = match.map(Number)
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }
  return null
}