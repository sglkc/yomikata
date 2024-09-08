<script>
import { page } from '$app/stores'
import { navbarOpened } from '$lib/stores/navbar-store'
import Link from './Link.svelte'
import clsx from 'clsx'

const menus = [
  { title: 'Home', href: '/' },
  { title: 'Read', href: '/read' },
  { title: 'About', href: '/about' }
]

const toggleSidebar = () => navbarOpened.update(s => !s)
const closeSidebar = () => navbarOpened.set(false)
</script>

<nav
  class:!translate-x-0={$navbarOpened}
  class={clsx(
    'h-100svh py-8 bg-base b-base b-r-2 flex flex-col gap-8 font-heading',
    'fixed inset-0 z-10 w-96 transition-transform -translate-x-96 lg:translate-x-0'
  )}>
  <button
    class="block lg:hidden absolute left-full ml-4 bg-base b-base b-2 w-12 h-12"
    on:click={toggleSidebar}
  >
    =
  </button>
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
        <a
          class="fw-medium text-6"
          on:click={closeSidebar}
          href={menu.href}
        >
          {menu.title}
        </a>
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
