<script lang="ts">
import clsx from 'clsx'
import Overlay from '$lib/components/Overlay.svelte'

let sidebarOpened = false

const toggleSidebar = () => sidebarOpened = !sidebarOpened
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
    <ul class="grid w-full grow">
      <li class="flex flex-col gap-4">
      </li>
    </ul>
  </div>
</aside>
