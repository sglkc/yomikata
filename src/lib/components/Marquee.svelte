<script lang="ts">
import clsx from 'clsx'

interface $$Props {
  class?: string
  style?: string
}
</script>

<style>
@keyframes scroll {
  from { translate: 100%; }
  to { translate: -100%; }
}

.marquee-container {
  --duration: 20s;
  --easing: linear;
  --direction: normal;
  position: relative;
  display: flex;
  overflow: hidden;
}

.marquee-1, .marquee-2 {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.marquee-1 {
  animation: scroll var(--duration) var(--easing) infinite var(--direction);
}

.marquee-2 {
  position: absolute;
  translate: 100%;
  animation: scroll var(--duration) var(--easing) infinite var(--direction);
  animation-delay: calc(var(--duration) / 2);
}
</style>

<div class={clsx(`marquee-container`, $$props.class)} style={$$props.style}>
  <div class="marquee-1">
    <slot />
  </div>
  <div class="marquee-2">
    <slot />
  </div>
</div>
