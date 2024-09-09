import type Alert from '$lib/components/Alert.svelte'
import type { ComponentProps } from 'svelte'
import { writable } from 'svelte/store'

type AlertStore = ComponentProps<Alert> & { message?: string }

export const alertStore = writable<AlertStore>({})
export const fullscreen = writable(false)
export const navbarOpened = writable(false)
