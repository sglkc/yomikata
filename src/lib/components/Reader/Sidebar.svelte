<script lang="ts">
import clsx from 'clsx'
import Button from '../Button.svelte';
import Input from '$lib/components/Input.svelte'
import Overlay from '$lib/components/Overlay.svelte'
import { fullscreen, zoomLevel } from '$lib/stores/reader-store'

let sidebarOpened = false

const toggleSidebar = () => sidebarOpened = !sidebarOpened
const toggleFullscreen = () => {
  if ($fullscreen) {
    window.document.exitFullscreen()
  } else {
    window.document.documentElement.requestFullscreen()
  }

  fullscreen.update(v => !v)
}

const updateZoom = (op: '-' | '+') => () => {
  zoomLevel.update(v => v < 50 ? 50 : v > 150 ? 150 : eval(`${v} ${op} 10`))
}
</script>

<Overlay
  class={['z-5', !sidebarOpened && 'hidden']}
  on:click={toggleSidebar}
/>

<aside
  class:!translate-x-0={sidebarOpened}
  class={clsx(
    'fixed top-0 bottom-0 right-0 py-8 bg-base b-base b-l-2 z-10 w-72',
    'transition-transform translate-x-72'
  )}
>
  <button
    class={clsx(
      'absolute right-full -mt-4 mr-4 bg-base b-base b-2 w-12 h-12',
      'transition-shadow shadow-0 on:shadow-base'
    )}
    on:click={toggleSidebar}
  >
    <div class="m-auto text-2xl i-mci:settings-3-line" />
  </button>
  <div
    class:!hidden={!sidebarOpened}
    class="flex flex-col gap-8 h-full"
  >
    <header class="font-heading text-center">
      <h1 class="fw-bold text-7">Reader Settings</h1>
    </header>
    <ul class="mx-4 grid gap-4">
      <li>
        <Button class="p-4 flex items-center gap-4" on:click={toggleFullscreen}>
          <div class="text-2xl i-mci:fullscreen-line" />
          <span>Toggle fullscreen</span>
        </Button>
      </li>
      <li class="flex gap-2">
        <Button on:click={updateZoom('-')}>
          <div class="mx-auto text-2xl i-mci:zoom-out-line" />
        </Button>
        <Input min="50" max="150" step="10" bind:value={$zoomLevel} />
        <Button on:click={updateZoom('+')}>
          <div class="mx-auto text-2xl i-mci:zoom-in-line" />
        </Button>
      </li>
    </ul>
  </div>
</aside>
