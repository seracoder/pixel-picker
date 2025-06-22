<script lang="ts">
  import { recentColorsStore, colorStore } from './colorStore'

  const selectColor = (color: string) => {
    colorStore.set(color)
  }
</script>

{#if $recentColorsStore.length > 0}
  <div class="color-card">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-medium text-gray-700">Recent</h3>
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    
    <div class="grid grid-cols-6 gap-2">
      {#each $recentColorsStore as color}
        <button
          on:click={() => selectColor(color)}
          class="aspect-square rounded-sm border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 hover:scale-105 transform"
          style="background-color: {color}"
          title={color}
        ></button>
      {/each}
    </div>
  </div>
{:else}
  <div class="color-card text-center py-6">
    <svg class="w-8 h-8 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="text-sm text-gray-500">No recent colors</p>
    <p class="text-xs text-gray-400 mt-1">Pick a color to get started</p>
  </div>
{/if}