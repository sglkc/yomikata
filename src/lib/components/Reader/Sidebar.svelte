<script lang="ts">
import { get } from 'svelte/store'
import ColorPicker from 'svelte-awesome-color-picker'
import clsx from 'clsx'
import Button from '$lib/components/Button.svelte'
import Input from '$lib/components/Input.svelte'
import Overlay from '$lib/components/Overlay.svelte'
import {
  sidebarOpened,
  fullscreen,
  readerBg,
  textBg,
  textColor,
  zoomLevel,
  readerGap,
} from '$lib/stores/reader-store'

const colors = [readerBg, textBg, textColor]
let colorIndex = -1

const toggleSidebar = () => sidebarOpened.update(s => !s)
const toggleGap = () => readerGap.update(s => !s)
const toggleFullscreen = () => {
  if ($fullscreen) {
    window.document.exitFullscreen()
  } else {
    window.document.documentElement.requestFullscreen()
  }

  fullscreen.update(v => !v)
}

const colorPickerChange = (e: CustomEvent<{ hex: string | undefined }>) => {
  if (colorIndex !== -1) return colors[colorIndex].set(e.detail.hex ?? '')
}

const toggleColorPicker = (index: number) => () => {
  colorIndex = colorIndex !== index ? index : -1
}
</script>

{#if colorIndex !== -1}
  <Overlay class="z-30" on:click={toggleColorPicker(-1)}>
    <div on:click|stopPropagation={() => null} role="presentation">
      <ColorPicker
        on:input={colorPickerChange}
        nullable={true}
        isDialog={false}
        texts={{ label: { withoutColor: 'Set to transparent' } }}
        hex={get(colors[colorIndex])}
      />
    </div>
  </Overlay>
{/if}

<aside
  class:z-25={$sidebarOpened}
  class:!translate-x-0={$sidebarOpened}
  class={clsx(
    'fixed top-0 bottom-0 right-0 py-8 bg-base b-base b-l-2 z-15 w-72',
    'transition-transform translate-x-72'
  )}
>
  <button
    class={clsx(
      'absolute right-full -mt-4 mr-4 bg-base b-base b-2 w-12 h-12',
      'transition-shadow shadow-0 on:shadow-base'
    )}
    on:click={toggleSidebar}
  >
    <div class="m-auto text-2xl i-mci:settings-3-line" />
  </button>
  <div
    class:!hidden={!$sidebarOpened}
    class="flex flex-col gap-8 h-full"
  >
    <header class="font-heading text-center">
      <h1 class="fw-bold text-7">Reader Settings</h1>
    </header>
    <ul class="mx-4 grid gap-4">
      <li>
        <Button class="p-4 flex items-center gap-4" on:click={toggleFullscreen}>
          <div
            class="text-2xl"
            class:i-mci:fullscreen-line={!$fullscreen}
            class:i-mci:fullscreen-exit-line={$fullscreen}
          />
          <span>Toggle fullscreen</span>
        </Button>
      </li>
      <li>
        <Button class="p-4 flex items-center gap-4" on:click={toggleGap}>
          <div class="text-2xl i-mci:spacing-vertical-line"/>
          <span>Toggle margin</span>
        </Button>
      </li>
      <li class="flex gap-2">
        <Button on:click={() => zoomLevel.change(-5)}>
          <div class="mx-auto text-2xl i-mci:zoom-out-line" />
        </Button>
        <Input bind:value={$zoomLevel} disabled />
        <Button on:click={() => zoomLevel.change(5)}>
          <div class="mx-auto text-2xl i-mci:zoom-in-line" />
        </Button>
      </li>
      <li>
        <Button
          class="p-4 flex items-center gap-4"
          on:click={toggleColorPicker(0)}
        >
          <div class="ring-1 ring-black">
            <div
              class="text-2xl i-mci:background-line"
              style:color={$readerBg}
            />
          </div>
          <span>Reader background</span>
        </Button>
      </li>
      <li>
        <Button
          class="p-4 flex items-center gap-4"
          on:click={toggleColorPicker(1)}
        >
          <div class="ring-1 ring-black">
            <div
              class="text-2xl i-mci:text-area-line"
              style:color={$textBg}
            />
          </div>
          <span>Text background</span>
        </Button>
      </li>
      <li>
        <Button
          class="p-4 flex items-center gap-4"
          on:click={toggleColorPicker(2)}
        >
          <div class="ring-1 ring-black">
            <div
              class="text-2xl i-mci:text-color-line"
              style:color={$textColor}
            />
          </div>
          <span>Text color</span>
        </Button>
      </li>
    </ul>
  </div>
</aside>
