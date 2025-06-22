<script lang="ts">
  export let activeTab = 'home'

  const tabs = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'palette', label: 'Palettes', icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1h-2M7 4h10M9 9h6m-6 4h6m-6 4h6' }
  ]
</script>

<nav class="border-b border-gray-200 bg-white">
  <div class="flex">
    {#each tabs as tab}
      <button
        on:click={() => activeTab = tab.id}
        class="tab-button {activeTab === tab.id ? 'tab-active' : 'tab-inactive'} flex-1 flex items-center justify-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tab.icon} />
        </svg>
        <span>{tab.label}</span>
      </button>
    {/each}
  </div>
</nav>