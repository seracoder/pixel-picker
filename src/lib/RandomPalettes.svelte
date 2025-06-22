<script lang="ts">
  import { onMount } from 'svelte'
  import { colorStore } from './colorStore'

  interface ColorPalette {
    id: string
    name: string
    colors: string[]
  }

  let palettes: ColorPalette[] = []

  const generateRandomColor = (): string => {
    const hue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(Math.random() * 40) + 60 // 60-100%
    const lightness = Math.floor(Math.random() * 40) + 30 // 30-70%
    
    // Convert HSL to HEX
    const h = hue / 360
    const s = saturation / 100
    const l = lightness / 100
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    
    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const generateHarmoniousPalette = (baseHue: number, type: string): string[] => {
    const colors: string[] = []
    
    switch (type) {
      case 'monochromatic':
        for (let i = 0; i < 5; i++) {
          const lightness = 20 + (i * 15)
          colors.push(hslToHex(baseHue, 70, lightness))
        }
        break
      case 'analogous':
        for (let i = 0; i < 5; i++) {
          const hue = (baseHue + (i * 30)) % 360
          colors.push(hslToHex(hue, 70, 50))
        }
        break
      case 'complementary':
        colors.push(hslToHex(baseHue, 70, 50))
        colors.push(hslToHex((baseHue + 180) % 360, 70, 50))
        colors.push(hslToHex(baseHue, 50, 70))
        colors.push(hslToHex((baseHue + 180) % 360, 50, 70))
        colors.push(hslToHex(baseHue, 30, 30))
        break
      case 'triadic':
        colors.push(hslToHex(baseHue, 70, 50))
        colors.push(hslToHex((baseHue + 120) % 360, 70, 50))
        colors.push(hslToHex((baseHue + 240) % 360, 70, 50))
        colors.push(hslToHex(baseHue, 50, 70))
        colors.push(hslToHex((baseHue + 120) % 360, 50, 70))
        break
      default:
        for (let i = 0; i < 5; i++) {
          colors.push(generateRandomColor())
        }
    }
    
    return colors
  }

  const hslToHex = (h: number, s: number, l: number): string => {
    const hDecimal = h / 360
    const sDecimal = s / 100
    const lDecimal = l / 100
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    let r, g, b
    if (sDecimal === 0) {
      r = g = b = lDecimal
    } else {
      const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal
      const p = 2 * lDecimal - q
      r = hue2rgb(p, q, hDecimal + 1/3)
      g = hue2rgb(p, q, hDecimal)
      b = hue2rgb(p, q, hDecimal - 1/3)
    }
    
    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const generateRandomPalettes = () => {
    const paletteTypes = ['monochromatic', 'analogous', 'complementary', 'triadic', 'random']
    const paletteNames = [
      'Ocean Breeze', 'Sunset Glow', 'Forest Deep', 'Urban Night', 'Pastel Dream',
      'Autumn Leaves', 'Spring Fresh', 'Desert Sand', 'Arctic Cool', 'Tropical Vibes',
      'Vintage Charm', 'Modern Edge', 'Soft Whisper', 'Bold Statement', 'Natural Earth'
    ]
    
    const newPalettes: ColorPalette[] = []
    
    for (let i = 0; i < 8; i++) {
      const baseHue = Math.floor(Math.random() * 360)
      const type = paletteTypes[Math.floor(Math.random() * paletteTypes.length)]
      const name = paletteNames[Math.floor(Math.random() * paletteNames.length)]
      
      newPalettes.push({
        id: `palette-${i}`,
        name: `${name} ${i + 1}`,
        colors: generateHarmoniousPalette(baseHue, type)
      })
    }
    
    palettes = newPalettes
  }

  const selectColor = (color: string) => {
    colorStore.set(color)
  }

  const copyPalette = async (palette: ColorPalette) => {
    try {
      const paletteText = palette.colors.join(', ')
      await navigator.clipboard.writeText(paletteText)
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy palette:', error)
    }
  }

  onMount(() => {
    generateRandomPalettes()
  })
</script>

<div class="space-y-4">
  <!-- Header with refresh button -->
  <div class="flex items-center justify-between">
    <h3 class="text-sm font-medium text-gray-700">Color Palettes</h3>
    <button
      on:click={generateRandomPalettes}
      class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
      title="Generate new palettes"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  </div>

  <!-- Palettes Grid -->
  <div class="space-y-3 max-h-80 overflow-y-auto">
    {#each palettes as palette}
      <div class="color-card">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-xs font-medium text-gray-600">{palette.name}</h4>
          <button
            on:click={() => copyPalette(palette)}
            class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy palette colors"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        <div class="flex space-x-1">
          {#each palette.colors as color}
            <button
              on:click={() => selectColor(color)}
              class="flex-1 h-8 rounded-sm border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:scale-105 transform"
              style="background-color: {color}"
              title={color}
            ></button>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Info text -->
  <div class="text-center py-2">
    <p class="text-xs text-gray-400">Click any color to select • Click refresh for new palettes</p>
  </div>
</div>