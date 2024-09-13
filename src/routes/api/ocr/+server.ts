import { error, json, type RequestHandler } from '@sveltejs/kit'
import Lens, { LensError } from 'chrome-lens-ocr'

export const GET: RequestHandler = async ({ url: baseUrl }) => {
  const url = baseUrl.searchParams.get('url')

  if (!url) return error(400, { message: 'url query missing' })
  if (!URL.canParse(url)) return error(400, { message: 'url is not valid' })

  const lens = new Lens()
  const result = await lens.scanByURL(url).catch((err) => err)

  if (result instanceof LensError)
    return error(500, { message: `OCR Error: ${result.message}` })

  if (result instanceof Error)
    return error(500, {
      message: `Fetch error: ${(result.cause as { message: string })?.message!}`,
    })

  return json(result, {
    headers: {
      'cache-control': 'public, max-age=31536000, immutable'
    }
  })
}
