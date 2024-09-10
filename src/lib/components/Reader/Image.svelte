<script lang="ts">
import type { LensResult } from 'chrome-lens-ocr'
import fetcher from '$lib/helpers/fetch'
import Bubble from './Bubble.svelte'

export let index: number
export let src: string

let bubbles: Array<{
  text: string
  style: string
}> = []

async function getText() {
  const url = fetcher.makeUrl('/api/ocr', { url: src })
  const res = await fetch(url)
  const json = await res.json() as LensResult

  json.segments.forEach(({ text, boundingBox: b }) => {
    const { centerPerX: x, centerPerY: y, perWidth: w, perHeight: h } = b
    let style = ''

    style += `top: calc(${y * 100}% - ${h * 50}%);`
    style += `left: calc(${x * 100}% - ${w * 50}%);`
    style += `width: ${w * 100}%;`
    style += `height: ${h * 100}%;`
    style += 'writing-mode:' + ((w / h) < 4 ? 'vertical-rl' : 'inherit') + ';'

    bubbles = [...bubbles, { text, style }]
  })
}
</script>

<button on:click={(e) => { getText(); e.currentTarget.remove() }}>Get Text</button>
<div class="relative overflow-hidden">
  <img
    class="w-full h-auto lg:min-h-xl object-contain"
    loading="lazy"
    src={'https://wsrv.nl/?url=' + src}
    alt={`Image page ${index}`}
  />
  {#each bubbles as bubble, i (i)}
    <Bubble {...bubble} />
  {/each}
</div>
