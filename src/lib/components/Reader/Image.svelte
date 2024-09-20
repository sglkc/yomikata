<script lang="ts">
import type { LensResult } from 'chrome-lens-ocr'
import fetcher from '$lib/utils/fetch'
import Bubble from './Bubble.svelte'

export let index: number
export let src: string

let bubbles: { text: string, x: number, y: number, w: number, h: number }[] = []

async function getText() {
  const url = fetcher.makeUrl('/api/ocr', { url: src })
  const res = await fetch(url)
  const json = await res.json() as LensResult

  json.segments.forEach(({ text, boundingBox: b }) => {
    const { centerPerX: x, centerPerY: y, perWidth: w, perHeight: h } = b
    bubbles = [...bubbles, { text, x, y, w, h }]
  })
}
</script>

<button on:click={(e) => { getText(); e.currentTarget.remove() }}>Get Text</button>
<div
  class="mx-auto relative overflow-hidden"
  style="width: var(--image-width); container-type: inline-size;"
>
  <img
    class="min-h-128 w-full object-contain"
    loading="lazy"
    on:load={(e) => e.currentTarget.classList.remove('min-h-128')}
    src={'https://wsrv.nl/?url=' + src}
    alt={`Image page ${index}`}
  />
  {#each bubbles as bubble, i (i)}
    <Bubble {...bubble} />
  {/each}
</div>
