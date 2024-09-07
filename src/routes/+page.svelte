<script lang="ts">
import { onMount } from 'svelte'
import type { LensResult } from 'chrome-lens-ocr'

type MangaImage = {
  src: string
  segments: Array<{
    text: string
    style: string
  }>
}

let images: MangaImage[] = []

onMount(() => !images.length &&
  getManga('https://jmanga.org/read/ココロのプログラム/ja/chapter-1-raw/')
)

const getUrl = (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(endpoint, location.href)
  if (params) Object.entries(params).forEach(([ k, v ]) => url.searchParams.set(k, v))
  return url
}

async function getManga(mangaUrl: string) {
  const url = getUrl('/api/manga', { url: mangaUrl })
  const res = await fetch(url)
  const json = await res.json() as { images?: string[] }

  if (!json.images || !Array.isArray(json.images)) return

  json.images.forEach(src => images = [...images, { src, segments: [] }])
}

async function getText(index: number) {
  const image = images.at(index)

  if (!image) return

  const url = getUrl('/api/ocr', { url: image.src })
  const res = await fetch(url)
  const json = await res.json() as LensResult

  json.segments.forEach(({ text, boundingBox: b }) => {
    const { centerPerX: x, centerPerY: y, perWidth: w, perHeight: h } = b
    let style: string = ''

    style += `top: calc(${y * 100}% - ${h * 50}%);`
    style += `left: calc(${x * 100}% - ${w * 50}%);`
    style += `width: ${w * 100}%;`
    style += `height: ${h * 100}%;`
    style += 'writing-mode:' + ((w / h) < 4 ? 'vertical-rl' : 'inherit') + ';'

    image.segments.push({ text, style })
    images = images
  })
}
</script>

<div class="grid">
  {#each images as image, i}
    <div class="w-xl relative overflow-hidden">
      <button on:click={() => getText(i)}>Get Text</button>
      <img
        class="w-full h-auto object-contain"
        loading="lazy"
        src={image.src}
        alt={`Image page ${i}`}
      />

      {#each image.segments as segment}
        <p
          class="absolute text-yellow bg-black/50 ring-1 ring-red break-all text-orientation-upright"
          style={segment.style}
        >
          { segment.text }
        </p>
      {/each}

    </div>
  {/each}
</div>
