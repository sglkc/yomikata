<script lang="ts">
import type { HTMLInputAttributes } from 'svelte/elements'
import clsx from 'clsx'

interface $$Props extends HTMLInputAttributes {}

let { class: className, ...rest } = $$props
</script>

<input
  class={clsx(
    'p-4 b-base b-2 rounded-lg w-full',
    className
  )}
  placeholder="Type something here..."
  {...rest}
/>
