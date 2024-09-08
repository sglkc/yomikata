<script lang="ts">
import clsx from 'clsx'
import Card from './Card.svelte'
import type { HTMLButtonAttributes } from 'svelte/elements'

interface $$Props extends HTMLButtonAttributes {}

let { class: className, ...rest } = $$restProps
</script>

<Card class={className} pop>
  <button class="absolute inset-0" {...rest} on:click>
    <slot />
  </button>
  <slot name="decoration" />
</Card>
