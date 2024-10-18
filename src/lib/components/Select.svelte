<script lang="ts">
import SvelteSelect from 'svelte-select'
import type { HTMLButtonAttributes } from 'svelte/elements'

interface $$Props extends HTMLButtonAttributes {
  'card-class'?: string
  'items': Array<{ label: string, value: string }>
  'value': string
}

export let items
export let value: string

let listOpen = false

const handleSelect = (v: string) => {
  value = v
  listOpen = false
}
</script>

<SvelteSelect
  class="!p-4 !b-2 !b-base shadow-base gap-4"
  clearable={false}
  bind:listOpen
  bind:value
  {items}
>
  <svelte:fragment slot="prepend">
    <slot name="icon" />
  </svelte:fragment>
  <ul slot="list" let:filteredItems>
    {#each filteredItems as { label, value }, i (value)}
      <li class="b-x-2 b-b-2 b-base" class:b-t-2={i === 0}>
        <button class="mr-auto p-4 w-full" on:click={() => handleSelect(value)}>
          { label }
        </button>
      </li>
    {/each}
  </ul>
</SvelteSelect>
