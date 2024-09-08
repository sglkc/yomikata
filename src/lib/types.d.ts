import type { FetcherResponse } from './helpers/fetch'

export type MangaProvider = {
  name: string
  url: string
  matcher: string
  description: string
}

export type MangaProviderGet = (url: string) => FetcherResponse<string[]>

export {}
