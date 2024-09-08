<script lang="ts">
import { onMount } from 'svelte'
import clsx from 'clsx'
import { onNavigate } from '$app/navigation'
import { page } from '$app/stores'
import { fullscreen, navbarOpened } from '$lib/stores/page-store'
import Link from './Link.svelte'

const menus = [
  { title: 'Home', href: '/', fullscreen: false },
  { title: 'Read', href: '/read', fullscreen: true },
  { title: 'About', href: '/about', fullscreen: false }
]

const toggleSidebar = () => navbarOpened.update(s => !s)
const closeSidebar = () => navbarOpened.set(false)
const checkFullscreen = () => {
  const menu = menus.find(m => m.href === window.location.pathname)
  if (!menu) return
  fullscreen.set(menu.fullscreen)
  navbarOpened.set(false)
}

onMount(checkFullscreen)
onNavigate(checkFullscreen)
</script>

<div
  class:hidden={!$navbarOpened}
  class="fixed inset-0 z-9 bg-black/10"
  role="presentation"
  on:click={toggleSidebar}
/>
<nav
  class:!translate-x-0={$navbarOpened}
  class:!lg:translate-x-0={!$fullscreen}
  class={clsx(
    'h-100svh py-8 bg-base b-base b-r-2 flex flex-col gap-8 font-heading',
    'fixed inset-0 z-10 w-72 transition-transform -translate-x-72'
  )}
>
  <button
    class:!block={$fullscreen}
    class="block lg:hidden absolute left-full -mt-4 ml-4 bg-base b-base b-2 w-12 h-12 pointer-events-auto"
    on:click={toggleSidebar}
  >
    =
  </button>
  <header class="text-center">
    <h1 class="fw-bold text-12 -skew-8">YOMIKATA</h1>
  </header>
  <ul class="grid w-full grow">
    {#each menus as menu, i}
      <li
        class:bg-pink-300={$page.url.pathname == menu.href}
        class:b-t-2={i == 0}
        class="b-base b-b-2 grid transition-colors on:bg-pink-300"
      >
        <a
          class="p-4 fw-medium text-6"
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
