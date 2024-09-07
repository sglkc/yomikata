<script lang="ts">
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/bricolage-grotesque'
import Link from '$lib/components/Link.svelte'
</script>

<div class="bg-base text-base font-body min-h-100svh flex flex-col justify-between">
  <header class="px-8 py-4 b-base b-b-4 flex justify-between items-center font-heading fw-bold">
    <h1 class="text-8">YOMIKATA</h1>
  </header>
  <main class="p-8">
    <slot />
  </main>
  <footer class="p-8 b-base b-t-4 flex justify-between">
    <p>
      Made with love by <Link href="https://github.com/sglkc">sglkc</Link>.
    </p>
    <p>
      MIT License &copy; 2024
    </p>
  </footer>
</div>
