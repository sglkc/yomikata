import { writable } from 'svelte/store'

function createNumberStore(...options: [number, number, number]) {
  const [defaultValue, min, max] = options
  const { update, set, subscribe } = writable(defaultValue)

  return {
    min, max, set, subscribe, update,
    change: (v: number) => update((s) => {
      const value = v + s

      if (v > 0 && value > max) return max
      if (v < 0 && value < min) return min

      return value
    }),
    reset: () => set(defaultValue)
  }
}

const isMobile = window.matchMedia('(max-width: 640px)').matches

export const sidebarOpened = writable(false)
export const fullscreen = writable(false)
export const readerBg = writable<string>()
export const readerGap = writable(false)
export const textBg = writable('#0000007f')
export const textColor = writable('#fce303')
export const zoomLevel = createNumberStore(isMobile ? 100 : 50, 10, 100)
export const translateLang = writable('en')
