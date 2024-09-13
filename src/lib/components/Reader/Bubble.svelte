<script lang="ts">
export let x, y, w, h: number
export let text: string

$: text = text.replace('･･･', '…')

let isVertical = (w / h) < 4
let fontSize = 100
let div: HTMLDivElement
let p: HTMLParagraphElement
let divStyle = `
background-color: var(--bubble-bg);
color: var(--bubble-text);
text-orientation: upright;
box-sizing: border-box;
top: ${y * 100 - h * 50}%;
left: ${x * 100 - w * 50}%;
width: ${w * 110}%;
height: ${h * 110}%;
writing-mode: ${isVertical ? 'vertical-rl' : 'inherit'};
`

$: if (div && p && div.clientHeight && div.clientWidth) {
  const { clientHeight: dh, clientWidth: dw } = div
  let min = 1
  let max = 100
  fontSize = max

  while (min <= max) {
    fontSize = Math.floor((min + max) / 2)
    p.style.fontSize = fontSize + 'px'

    if (p.scrollHeight > dh || p.scrollWidth > dw) {
      max = fontSize - 1
    } else {
      min = fontSize + 1
    }
  }

  p.style.fontSize = fontSize + 'px'
}
</script>

<div
  bind:this={div}
  class="absolute text-orientation-upright"
  style={divStyle}
>
  <p bind:this={p} class="leading-tight">{ text }</p>
</div>
