import { error, json, type RequestHandler } from '@sveltejs/kit'
import * as cheerio from 'cheerio'

export const GET: RequestHandler = async ({ url: baseUrl }) => {
  const url = baseUrl.searchParams.get('url')

  if (!url) return error(400, { message: 'url query missing' })
  if (!URL.canParse(url)) return error(400, { message: 'url is not valid' })

  const pageRes = await fetch(url)
  const page = await pageRes.text()
  const $page = cheerio.load(page)
  const id = $page(`[data-id] [href*=${url}]`).parent().data('id')

  if (!id) return error(500, { message: 'chapter id not found' })

  const chapUrl = `https://jmanga.org/json/chapter?mode=vertical&id=${id}`
  const chapJson = await (await fetch(chapUrl)).json() as { html: string }
  const $ = cheerio.load(chapJson.html)

  const images: string[] = $('img')
    .map((_, img) => $(img).data('src'))
    .toArray() as string[]

  if (!Array.isArray(images) || !images.length)
    return error(500, { message: 'images not found' })

  return json({ images })
}
