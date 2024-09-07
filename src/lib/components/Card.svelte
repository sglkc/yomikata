<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements'
import clsx from 'clsx'

interface $$Props extends HTMLAttributes<EventTarget> {
  pop?: boolean
}

let { class: className, pop, ...rest } = $$restProps
</script>

<div
  class={clsx(
    'relative p-8 b-base b-2 rounded-lg shadow-base',
    pop && 'transition-[box-shadow,transform] on:shadow-sm on:-translate-4px',
    className
  )}
  {...rest}
>
  <slot />
</div>
