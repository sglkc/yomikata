<script lang="ts">
export let x, y, w, h: number
export let text: string

let style = 'background-color: var(--bubble-bg);'
style += 'color: var(--bubble-text);'
style += 'text-orientation: upright;'
style += `top: calc(${y * 100}% - ${h * 50}%);`
style += `left: calc(${x * 100}% - ${w * 50}%);`
style += `width: ${w * 100}%;`
style += `height: ${h * 100}%;`
style += 'writing-mode:' + ((w / h) < 4 ? 'vertical-rl' : 'inherit') + ';'
</script>

<p
  class="absolute ring-1 ring-red break-all text-orientation-upright"
  {style}
>
  { text }
</p>
