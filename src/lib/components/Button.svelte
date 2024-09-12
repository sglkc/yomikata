<script lang="ts">
import clsx from 'clsx'
import Card from './Card.svelte'
import type { HTMLButtonAttributes } from 'svelte/elements'

interface $$Props extends HTMLButtonAttributes {
  'card-class'?: string
}
</script>

<Card class={$$restProps['card-class']} pop>
  <button
    {...$$restProps}
    class={clsx('absolute inset-0 mx-auto', $$props.class)}
    on:click
  >
    <slot />
  </button>
  <slot name="decoration" />
</Card>
