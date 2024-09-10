import type Alert from '$lib/components/Alert.svelte'
import type { ComponentProps } from 'svelte'
import { writable } from 'svelte/store'

type AlertStore = [] | [ ComponentProps<Alert>['type'], string ]

export const alertStore = writable<AlertStore>([])
export const navbarCollapsible = writable(false)
export const navbarOpened = writable(false)
