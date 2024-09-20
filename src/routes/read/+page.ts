import { error } from '@sveltejs/kit'
import { mangaUrl } from '$lib/stores/page-store'
import fetcher from '$lib/utils/fetch'

export const ssr = false
export async function load(e) {
  let murl = e.url.searchParams.get('manga-url')

  if (!murl) mangaUrl.subscribe(v => murl = v)()
  if (!murl) return error(400, 'Manga url is empty!')

  // TODO: check manga provider

  const url = fetcher.makeUrl('/api/manga', { url: murl })
  const res = await fetcher.fetchJson<{ images: string[] }>(url, {}, e.fetch)

  if (fetcher.isError(res)) return error(...res)

  const images = res.images

  return {
    images
  }
}
