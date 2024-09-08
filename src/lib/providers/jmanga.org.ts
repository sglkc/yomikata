import * as cheerio from 'cheerio'
import type { MangaProvider, MangaProviderGet } from './index'

const details: MangaProvider = {
  name: 'jmanga',
  url: 'jmanga.org',
  matcher: String.raw`read\/\S+\/ja\/chapter-\d+-raw`,
  description: '',
}

const get: MangaProviderGet = async (url) => {
  const res = await fetch(url).catch(err => err as Error)

  if (res instanceof Error) return [500, `unable to fetch ${url}`]
  if (!res.ok) return [500, `${url} returned ${res.status}`]

  const page = await res.text()
  const $page = cheerio.load(page)
  const id = $page(`[data-id] [href*=${url}]`).parent().data('id')

  if (!id) return [500, 'chapter id not found']

  const chapUrl = `https://jmanga.org/json/chapter?mode=vertical&id=${id}`
  const chapJson = await (await fetch(chapUrl)).json() as { html: string }
  const $ = cheerio.load(chapJson.html)

  const images: string[] = $('img')
    .map((_, img) => $(img).data('src'))
    .toArray() as string[]

  if (!Array.isArray(images) || !images.length)
    return [500, 'images not found']

  return images
}

export { details, get }
