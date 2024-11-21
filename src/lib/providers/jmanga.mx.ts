import * as cheerio from 'cheerio'
import type { MangaProvider, MangaProviderGet } from '$lib/types'
import fetcher from '$lib/utils/fetch'

const details: MangaProvider = {
  name: 'jmanga',
  url: 'jmanga.mx',
  matcher: String.raw`read\/\S+\/ja\/chapter-\d+-raw`,
  description: '',
}

const get: MangaProviderGet = async (url) => {
  const page = await fetcher.fetchText(url)

  if (fetcher.isError(page)) return page

  const $page = cheerio.load(page)
  const id = $page(`[data-id] [href*=${url}]`).parent().data('id')

  if (!id) return [404, 'chapter id not found']

  const chapUrl = `https://jmanga.mx/json/chapter?mode=vertical&id=${id}`
  const chapter = await fetcher.fetchJson<{ html: string }>(chapUrl)

  if (fetcher.isError(chapter)) return chapter

  const $chapter = cheerio.load(chapter.html)

  const images: string[] = $chapter('img')
    .map((_, img) => $chapter(img).data('src'))
    .toArray() as string[]

  if (!Array.isArray(images) || !images.length)
    return [404, 'chapter images not found']

  return images
}

export { details, get }
