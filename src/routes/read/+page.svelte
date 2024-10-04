<script lang="ts">
import Image from '$lib/components/Reader/Image.svelte'
import Sidebar from '$lib/components/Reader/Sidebar.svelte'
import {
  readerBg,
  readerGap,
  textBg,
  textColor,
  zoomLevel,
} from '$lib/stores/reader-store'
import type { PageData } from './$types'

export let data: PageData
let { images } = data
</script>

<Sidebar />

<div
  class="relative min-h-100svh -mx-8 grid overflow-auto"
  style:background-color={$readerBg}
  style:--bubble-text={$textColor}
  style:--bubble-bg={$textBg}
  style:--image-width={$zoomLevel + 'svw'}
>
  <div
    class="flex flex-col"
    class:gap-8={$readerGap}
  >
    {#each images as src, i (i)}
      <Image index={i} {src} />
    {/each}
  </div>
</div>
