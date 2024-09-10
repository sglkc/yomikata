import type { MangaProvider } from '$lib/types'

export function load() {
  const imports = import.meta.glob<MangaProvider>('$lib/providers/*.ts', {
    eager: true,
    import: 'details',
  })

  const providers = Object.values(imports)

  return {
    providers
  }
}
