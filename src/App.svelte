<script lang="ts">
  import ColorPicker from './lib/ColorPicker.svelte'
  import { onMount } from 'svelte'

  onMount(() => {
    // Initialize extension popup
    console.log('Pixel Picker initialized')
  })
</script>

<main class="w-full h-full bg-gray-50">
  <ColorPicker />
</main>