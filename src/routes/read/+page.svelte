<script lang="ts">
import Image from '$lib/components/Reader/Image.svelte'
import Sidebar from '$lib/components/Reader/Sidebar.svelte'
import {
  readerBg,
  textBg,
  textColor,
  textSize,
  zoomLevel,
} from '$lib/stores/reader-store'
import type { PageData } from './$types'

export let data: PageData
let { mangaUrl, images } = data
</script>

<Sidebar />

<div
  class="relative min-h-100svh -mx-8 grid overflow-auto"
  style:background-color={$readerBg}
  style:font-size={$textSize + 'px'}
  style:--bubble-text={$textColor}
  style:--bubble-bg={$textBg}
  style:--image-width={$zoomLevel + 'svw'}
>
  <div>
    {#each images as src, i (i)}
      <Image index={i} {src} />
    {/each}
  </div>
</div>
