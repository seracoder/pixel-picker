<script lang="ts">
  import { colorStore } from './colorStore'
  import { hexToRgb, hexToHsl, rgbToCss } from './colorUtils'

  let copiedFormat = ''

  $: rgb = hexToRgb($colorStore)
  $: hsl = hexToHsl($colorStore)
  $: cssColor = rgbToCss(rgb)

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      copiedFormat = format
      setTimeout(() => copiedFormat = '', 1000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatHsl = (h: number, s: number, l: number) => `${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`
</script>

<div class="color-card">
  <!-- Color Preview -->
  <div class="flex items-center space-x-4 mb-4">
    <div 
      class="w-16 h-16 rounded-lg border-2 border-gray-200 shadow-inner"
      style="background-color: {$colorStore}"
    ></div>
    <div class="flex-1">
      <h3 class="text-sm font-medium text-gray-700 mb-1">Current Color</h3>
      <p class="text-xs text-gray-500">Click any format to copy</p>
    </div>
  </div>

  <!-- Color Formats -->
  <div class="space-y-3">
    <!-- HEX -->
    <div>
      <span class="block text-xs font-medium text-gray-600 mb-1">HEX:</span>
      <button
        on:click={() => copyToClipboard($colorStore, 'hex')}
        class="color-value w-full text-left relative"
      >
        {$colorStore}
        {#if copiedFormat === 'hex'}
          <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 text-xs animate-fade-in">
            Copied!
          </span>
        {/if}
      </button>
    </div>

    <!-- HSL -->
    <div>
      <span class="block text-xs font-medium text-gray-600 mb-1">HSL:</span>
      <button
        on:click={() => copyToClipboard(formatHsl(hsl.h, hsl.s, hsl.l), 'hsl')}
        class="color-value w-full text-left relative"
      >
        {formatHsl(hsl.h, hsl.s, hsl.l)}
        {#if copiedFormat === 'hsl'}
          <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 text-xs animate-fade-in">
            Copied!
          </span>
        {/if}
      </button>
    </div>

    <!-- RGB CSS -->
    <div>
      <span class="block text-xs font-medium text-gray-600 mb-1">CSS:</span>
      <button
        on:click={() => copyToClipboard(cssColor, 'css')}
        class="color-value w-full text-left relative"
      >
        {cssColor}
        {#if copiedFormat === 'css'}
          <span class="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 text-xs animate-fade-in">
            Copied!
          </span>
        {/if}
      </button>
    </div>
  </div>
</div>