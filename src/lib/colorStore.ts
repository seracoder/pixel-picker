import { writable } from 'svelte/store'
import { browser } from './utils'

// Current selected color
export const colorStore = writable('#161d2e')

// Recent colors storage
export const recentColorsStore = writable<string[]>([])

// Load recent colors from Chrome storage
export const loadRecentColors = async () => {
  if (!browser || !chrome?.storage) return

  try {
    const result = await chrome.storage.local.get(['recentColors'])
    if (result.recentColors) {
      recentColorsStore.set(result.recentColors)
    }
  } catch (error) {
    console.error('Failed to load recent colors:', error)
  }
}

// Save recent colors to Chrome storage
const saveRecentColors = async (colors: string[]) => {
  if (!browser || !chrome?.storage) return

  try {
    await chrome.storage.local.set({ recentColors: colors })
  } catch (error) {
    console.error('Failed to save recent colors:', error)
  }
}

// Add a color to recent colors
export const addRecentColor = (color: string) => {
  recentColorsStore.update(colors => {
    // Remove if already exists
    const filtered = colors.filter(c => c !== color)
    // Add to beginning
    const updated = [color, ...filtered].slice(0, 12) // Keep only 12 recent colors
    saveRecentColors(updated)
    return updated
  })
}

// Initialize recent colors when the store is created
if (browser) {
  loadRecentColors()
}