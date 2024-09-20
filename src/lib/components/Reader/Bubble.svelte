<script lang="ts">
export let x, y, w, h: number
export let text: string

$: text = text.replace('･･･', '…')

let isVertical = (w / h) < 4
let fontSize = 100
let div: HTMLDivElement
let p: HTMLParagraphElement

$: if (div && p && div.clientHeight && div.clientWidth) {
  const { clientHeight: dh, clientWidth: dw } = div
  let min = 0.1
  let max = 50
  fontSize = max

  while ((max - min) > 0.5) {
    fontSize = (min + max) / 2
    p.style.fontSize = fontSize + 'cqw'

    if (p.scrollHeight > dh || p.scrollWidth > dw) {
      max = fontSize
    } else {
      min = fontSize
    }
  }

  p.style.fontSize = fontSize + 'cqw'
}
</script>

<div
  bind:this={div}
  class="absolute text-orientation-upright"
  style={`
  text-orientation: upright;
  box-sizing: border-box;
  top: ${y * 100 - h * 50}%;
  left: ${x * 100 - w * 50}%;
  width: ${w * 115}%;
  height: ${h * 115}%;
  writing-mode: ${isVertical ? 'vertical-rl' : 'inherit'};
  `}
>
  <p
    bind:this={p}
    class="leading-tight"
    style="background-color: var(--bubble-bg); color: var(--bubble-text);"
  >
    { text }
  </p>
</div>
