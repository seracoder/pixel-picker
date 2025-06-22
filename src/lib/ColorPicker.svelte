<script lang="ts">
  import TabContainer from './TabContainer.svelte'
  import ColorDisplay from './ColorDisplay.svelte'
  import RecentColors from './RecentColors.svelte'
  import RandomPalettes from './RandomPalettes.svelte'
  import { colorStore, addRecentColor } from './colorStore'

  let activeTab = 'home'
  let isPickingColor = false

  const pickColor = async () => {
    if (!('EyeDropper' in window)) {
      alert('Color picker is not supported in this browser')
      return
    }

    try {
      isPickingColor = true
      const eyeDropper = new (window as any).EyeDropper()
      const result = await eyeDropper.open()
      
      if (result.sRGBHex) {
        colorStore.set(result.sRGBHex)
        addRecentColor(result.sRGBHex)
      }
    } catch (error) {
      console.log('Color picking cancelled or failed:', error)
    } finally {
      isPickingColor = false
    }
  }
</script>

<div class="flex flex-col h-full bg-white">

  <!-- Tab Navigation -->
  <TabContainer bind:activeTab />

  <!-- Content -->
  <div class="flex-1 p-4 space-y-4 overflow-y-auto">
    {#if activeTab === 'home'}
      <!-- Color Display -->
      <ColorDisplay />
      
      <!-- Pick Color Button -->
      <button 
        on:click={pickColor}
        disabled={isPickingColor}
        class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>{isPickingColor ? 'Picking Color...' : 'Pick Color'}</span>
      </button>

      <!-- Recent Colors -->
      <RecentColors />
    {:else if activeTab === 'palette'}
      <!-- Random Palettes -->
      <RandomPalettes />
    {/if}
  </div>
</div>