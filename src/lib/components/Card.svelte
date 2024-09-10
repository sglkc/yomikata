<script lang="ts">
import clsx from 'clsx'

export let element: string = 'div'
export let pop: boolean = false
</script>

<svelte:element
  this={element}
  class={clsx(
    'relative p-8 b-base b-2 rounded-lg shadow-base',
    pop && 'transition-[box-shadow,transform] on:shadow-sm on:-translate-4px',
    $$props.class
  )}
>
  <slot />
</svelte:element>
