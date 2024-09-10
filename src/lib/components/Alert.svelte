<script lang="ts">
import { onMount } from 'svelte'
import { slide } from 'svelte/transition'
import clsx from 'clsx'
import { alertStore } from '$lib/stores/page-store'

interface $$Props {
  type?: 'success' | 'error'
}

let { type } = $$props

onMount(() => {
  setTimeout(() => alertStore.set([]), 3000)
})
</script>

<div
  class={clsx(
    'fixed top-4 right-4 p-4 b-base b-2 flex gap-2 items-center z-19',
    (type === 'success') ? 'bg-green-300' :
      (type === 'error') ? 'bg-red-300' :
        'bg-base'
  )}
  transition:slide|global={{ duration: 300 }}
>
  <div
    class={clsx(
      'text-2xl',
      (type === 'success') ? 'i-mci:check-circle-line' :
        (type === 'error') ? 'i-mci:warning-line' :
          'hidden'
    )}
  />
  <slot />
</div>
