<script lang="ts">
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/bricolage-grotesque'
import clsx from 'clsx'
import Navbar from '$lib/components/Navbar.svelte'
</script>

<Navbar />
<main class={clsx(
  'ml-0 p-8 bg-base text-base font-body min-h-100svh lg:ml-96 transition-[margin]'
)}>
  <slot />
</main>
