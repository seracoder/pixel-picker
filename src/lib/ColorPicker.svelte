<script lang="ts">
  import { onMount } from 'svelte'
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

  const openOptionsPage = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('options.html') })
  }
</script>

<div class="flex flex-col h-full bg-white">
  <!-- Header -->
  <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
    <h1 class="text-lg font-semibold text-gray-800">Pixel Picker</h1>
    <button 
      on:click={openOptionsPage}
      class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
      title="Settings"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  </div>

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