/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="chrome" />

interface Window {
  EyeDropper?: {
    new(): {
      open(): Promise<{ sRGBHex: string }>
    }
  }
}