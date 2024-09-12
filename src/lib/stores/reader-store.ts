import { writable } from 'svelte/store'

function createNumberStore(...options: [number, number, number]) {
  const [defaultValue, min, max] = options
  const store = writable(defaultValue)

  return {
    ...store,
    set: (v: number) => store.update((s) => {
      const value = v + s

      if (v === defaultValue) return v
      if (v > 0 && value > max) return max
      if (v < 0 && value < min) return min

      return value
    }),
    reset: () => store.set(defaultValue)
  }
}

export const sidebarOpened = writable(false)
export const fullscreen = writable(false)
export const readerBg = writable<string>()
export const textBg = writable('#0000007f')
export const textColor = writable('#fce303')
export const textSize = createNumberStore(16, 4, 24)
export const zoomLevel = createNumberStore(100, 50, 150)
