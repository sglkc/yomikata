import { error, json, type RequestHandler } from '@sveltejs/kit'
import Lens from 'chrome-lens-ocr'

export const GET: RequestHandler = async ({ url: baseUrl }) => {
  const url = baseUrl.searchParams.get('url')

  if (!url) return error(400, { message: 'url query missing' })
  if (!URL.canParse(url)) return error(400, { message: 'url is not valid' })

  const lens = new Lens()
  const result = await lens.scanByURL(url)

  return json(result)
}
