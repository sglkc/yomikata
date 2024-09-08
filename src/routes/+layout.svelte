<script lang="ts">
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/bricolage-grotesque'
import clsx from 'clsx'
import Navbar from '$lib/components/Navbar.svelte'
</script>

<div class={clsx(
  'bg-base text-base font-body min-h-100svh grid cols-10 justify-between'
)}>
  <div class="col-span-2">
    <Navbar />
  </div>
  <main class="col-span-8 p-8">
    <slot />
  </main>
</div>
