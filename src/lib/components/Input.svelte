<script lang="ts">
import type { HTMLInputAttributes } from 'svelte/elements'
import clsx from 'clsx'

interface $$Props extends HTMLInputAttributes {}

export let value = ''

let { class: className, ...rest } = $$props
</script>

<input
  class={clsx(
    'px-8 py-4 b-base b-2 rounded-full w-full text-base shadow-base',
    !(rest.readonly || rest.disabled) && 'transition-[box-shadow,font-size] ' +
      'on:shadow-sm on:md:text-lg',
    className
  )}
  placeholder="Type something here..."
  bind:value={value}
  on:paste
  {...rest}
/>
