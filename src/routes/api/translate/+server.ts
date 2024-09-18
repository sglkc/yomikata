import { error, json, type RequestHandler } from '@sveltejs/kit'
import Translate, { isSupported } from 'google-translate-api-x'

export const GET: RequestHandler = async ({ url: baseUrl }) => {
  const text = baseUrl.searchParams.get('text')
  const lang = baseUrl.searchParams.get('lang') ?? 'en'

  if (!text) return error(400, { message: 'text query missing' })
  if (!isSupported(lang))
    return error(400, {
      message: `language code ${lang} is not supported`
    })

  const res = await Translate(text, { to: lang }).catch((err) => err as Error)

  if (res instanceof Error)
    return error(500, {
      message: `Fetch error: ${(res.cause as { message: string })?.message!}`,
    })

  const { raw, ...result } = res

  return json(result, {
    headers: {
      'cache-control': 'public, max-age=31536000, immutable'
    }
  })
}
