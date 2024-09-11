import { writable } from 'svelte/store'

export const fullscreen = writable(false)
export const readerBg = writable('')
export const textBg = writable('')
export const textColor = writable('')
export const zoomLevel = writable(100)
