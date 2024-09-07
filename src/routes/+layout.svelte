<script lang="ts">
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '@fontsource-variable/sora'
import '@fontsource-variable/bricolage-grotesque'
</script>

<div class="bg-base text-base font-body min-h-100svh flex flex-col justify-between">
  <header class="px-8 py-4 b-base b-b-4 flex justify-between items-center font-heading fw-bold">
    <h1 class="text-8">YOMIKATA</h1>
  </header>
  <main class="p-8">
    <slot />
  </main>
  <footer class="p-8">
    <p>
      Yomikata | Made by <a href="https://github.com/sglkc">sglkc</a>
    </p>
  </footer>
</div>
