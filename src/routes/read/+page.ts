import fetcher from '$lib/utils/fetch.js'
import { error } from '@sveltejs/kit'

export const ssr = false
export async function load(e) {
  const mangaUrl = e.url.searchParams.get('url')

  if (!mangaUrl) return error(400, 'Manga url is empty!')

  // TODO: check manga provider

  const url = fetcher.makeUrl('/api/manga', { url: mangaUrl })
  const res = await fetcher.fetchJson<{ images: string[] }>(url, {}, e.fetch)

  if (fetcher.isError(res)) return error(...res)

  const images = res.images

  return {
    mangaUrl,
    images
  }
}
