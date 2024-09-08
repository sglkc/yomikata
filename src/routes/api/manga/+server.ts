import { error, json, type RequestHandler } from '@sveltejs/kit'
import type { MangaProvider, MangaProviderGet } from '$lib/types'
import fetcher from '$lib/helpers/fetch'

type ProviderImport = {
  details: MangaProvider
  get: MangaProviderGet
}

const providers = Object.entries(
  import.meta.glob<ProviderImport>('$lib/providers/*.ts')
)

export const GET: RequestHandler = async ({ url: baseUrl }) => {
  let url = baseUrl.searchParams.get('url')

  if (!url) return error(400, { message: '`url` query missing' })
  if (!url.startsWith('https://')) url = 'https://' + url
  if (!URL.canParse(url)) return error(400, { message: 'invalid url' })

  const { hostname, pathname } = new URL(url)
  const [, imports] = providers.find(p => p[0].includes(hostname)) ?? []

  if (!imports) return error(400, { message: `${hostname} is not supported` })

  const { details, get } = await imports()

  if (!pathname.match(details.matcher)) {
    const pattern = details.matcher
      .replaceAll(/S\+|d\+/g, '*')
      .replaceAll('\\', '')

    return error(400, `url pattern doesn't match: ${hostname}/${pattern}`)
  }

  const images = await get(url)

  if (fetcher.isError(images)) return error(...images)

  return json({ images })
}
