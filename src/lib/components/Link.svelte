<script lang="ts">
import type { HTMLAnchorAttributes } from 'svelte/elements'
import clsx from 'clsx'

interface $$Props extends HTMLAnchorAttributes {
  href: string
}

let { class: className, href, ...rest } = $$restProps
</script>

<a
  class={clsx(
    'b-base b-b-2 transition-[border] on:b-b-4',
    className
  )}
  href={href}
  {...rest}
>
  <slot />
</a>
