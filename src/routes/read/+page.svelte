<script lang="ts">
import Input from '$lib/components/Input.svelte'
import Image from '$lib/components/Reader/Image.svelte'
import Sidebar from '$lib/components/Reader/Sidebar.svelte'
import fetcher from '$lib/helpers/fetch'
import { readerBg, textBg, textColor, textSize, zoomLevel } from '$lib/stores/reader-store'

let mangaUrl = ''
let images: string[] = [
  'https://mgojp.mangadb.shop/files/5572/178600/3.webp',
  'https://mgojp.mangadb.shop/files/5572/178600/3.webp',
  'https://mgojp.mangadb.shop/files/5572/178600/3.webp',
]

async function getManga() {
  const url = fetcher.makeUrl('/api/manga', { url: mangaUrl })
  const res = await fetcher.fetchJson<{ images: string[] }>(url)

  if (fetcher.isError(res)) return console.error(res)

  images = res.images
}
</script>

<Sidebar />

<Input class="b-base b-2" bind:value={mangaUrl} />
<button on:click={getManga}>GET MANGA!!</button>

<div
  class="relative -mx-8 grid"
  style:background-color={$readerBg}
  style:zoom={$zoomLevel + '%'}
  style:font-size={$textSize + 'px'}
  style:--bubble-text={$textColor}
  style:--bubble-bg={$textBg}
>
  <div class="mx-auto">
    {#each images as src, i (i)}
      <Image index={i} {src} />
    {/each}
  </div>
</div>
