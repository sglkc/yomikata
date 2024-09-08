<script lang="ts">
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/bricolage-grotesque'
import Navbar from '$lib/components/Navbar.svelte'
import { fullscreen } from '$lib/stores/page-store'
</script>

<Navbar />
<main
  class:!lg:ml-72={!$fullscreen}
  class="ml-0 p-8 bg-base text-base font-body min-h-100svh transition-[margin]"
>
  <slot />
</main>
