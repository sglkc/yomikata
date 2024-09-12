<script lang="ts">
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/bricolage-grotesque'
import { slide } from 'svelte/transition'
import clsx from 'clsx'
import { afterNavigate, beforeNavigate } from '$app/navigation'
import { navigating } from '$app/stores'
import Alert from '$lib/components/Alert.svelte'
import Navbar from '$lib/components/Navbar.svelte'
import Overlay from '$lib/components/Overlay.svelte'
import { alertStore, navbarCollapsible, navbarOpened } from '$lib/stores/page-store'
import { sidebarOpened } from '$lib/stores/reader-store'
import type { PageData } from './$types'

export let data: PageData
let show = true

const toggleSidebars = () => {
  navbarOpened.set(false)
  sidebarOpened.set(false)
}

beforeNavigate(() => show = false)
afterNavigate((e) => e.complete.then(() => {
  show = true
  toggleSidebars()
}))
</script>


<Overlay
  class={['z-20', !($navbarOpened || $sidebarOpened) && 'hidden']}
  on:click={toggleSidebars}
/>

<Navbar />

{#if $alertStore.length}
  {#key $alertStore[1]}
    <Alert type={$alertStore[0]}>{ $alertStore[1] }</Alert>
  {/key}
{/if}

{#if $navigating}
  <Overlay>
    <div class="i-mci:loading-line animate-spin text-8xl" />
  </Overlay>
{/if}

{#key data.url}
  <main
    class:!lg:ml-72={!$navbarCollapsible}
    class={clsx(
      'ml-0 px-8 py-16 bg-base text-base font-body flex flex-col gap-4',
      'ring-1 ring-black transition-[margin]',
    )}
    in:slide={{ delay: 200 }}
    out:slide={{ duration: 200 }}
  >
    <slot />
  </main>
{/key}
