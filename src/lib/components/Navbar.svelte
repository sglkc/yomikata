<script>
import Link from './Link.svelte'
import { page } from '$app/stores'
import clsx from 'clsx'

const menus = [
  { title: 'Home', href: '/' },
  { title: 'Read', href: '/read' },
  { title: 'About', href: '/about' }
]
</script>

<nav
  class={clsx(
    'h-100svh py-8 b-base b-r-2 flex flex-col gap-8 font-heading',
    'sticky top-0 '
  )}>
  <header class="text-center">
    <h1 class="fw-bold text-8">YOMIKATA</h1>
  </header>
  <ul class="grid w-full grow">
    {#each menus as menu, i}
      <li
        class:bg-pink-300={$page.url.pathname == menu.href}
        class:b-t-2={i == 0}
        class="p-4 b-base b-b-2 grid transition-colors on:bg-pink-300"
      >
        <a class="fw-medium text-6" href={menu.href}>{menu.title}</a>
      </li>
    {/each}
  </ul>
  <footer class="text-center">
    <p>
      Made with &lt;3 by <Link href="https://github.com/sglkc">sglkc</Link>.
    </p>
    <p>
      MIT License &copy; 2024
    </p>
  </footer>
</nav>
