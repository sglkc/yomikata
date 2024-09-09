<script lang="ts">
import { slide } from 'svelte/transition'
import clsx from 'clsx'
    import { onMount } from 'svelte';
    import { alertStore } from '$lib/stores/page-store';

interface $$Props {
  type?: 'success' | 'error'
}

let { type } = $$props

onMount(() => {
  const timeout = setTimeout(() => alertStore.set({}), 3000)
  return () => clearTimeout(timeout)
})
</script>

<div
  class={clsx(
    'fixed top-0 right-0 p-4 b-base b-2 flex gap-4 items-center z-19',
    (type === 'success') ? 'bg-green-300' :
      (type === 'error') ? 'bg-red-300' :
        'bg-base'
  )}
  transition:slide|global={{ duration: 300 }}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 3h4v11h-4zm0 18v-4h4v4z"/></svg>
  <slot />
</div>
