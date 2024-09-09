<script lang="ts">
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/bricolage-grotesque'
import { slide } from 'svelte/transition'
import clsx from 'clsx'
import { afterNavigate, beforeNavigate } from '$app/navigation'
import Alert from '$lib/components/Alert.svelte'
import Navbar from '$lib/components/Navbar.svelte'
import { alertStore, fullscreen } from '$lib/stores/page-store'

let show = true

beforeNavigate(() => show = false)
afterNavigate(() => show = true)
</script>


<Navbar />

{#if $alertStore.length}
  {#key $alertStore[1]}
    <Alert type={$alertStore[0]}>{ $alertStore[1] }</Alert>
  {/key}
{/if}

{#key show}
  <main
    class:!lg:ml-72={!$fullscreen}
    class={clsx(
      'ml-0 px-8 py-16 bg-base text-base font-body transition-[margin]',
      'ring-1 ring-black',
    )}
    in:slide={{ delay: 200 }}
    out:slide={{ duration: 200 }}
  >
    <slot />
  </main>
{/key}
