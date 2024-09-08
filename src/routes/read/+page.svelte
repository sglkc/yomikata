<script lang="ts">
import Image from '$lib/components/Reader/Image.svelte'
import fetcher from '$lib/helpers/fetch'

let mangaUrl: string
let images: string[] = []

async function getManga(mangaUrl: string) {
  const url = fetcher.makeUrl('/api/manga', { url: mangaUrl })
  const res = await fetcher.fetchJson<{ images: string[] }>(url)

  if (fetcher.isError(res)) return console.error(res)

  images = res.images
}
</script>

<div class="grid">
  <input bind:value={mangaUrl} />
  <button on:click={() => getManga(mangaUrl)}>GET MANGA!!</button>
  {#each images as src, i (i)}
    <Image index={i} {src} />
  {/each}
</div>
