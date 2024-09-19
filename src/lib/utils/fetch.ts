export type FetcherResponse<T> = Promise<T | [number, string]>

const makeUrl = (
  endpoint: string,
  params?: Record<string, string>,
  base = location.href
): URL => {
  const url = new URL(endpoint, base)
  if (params) Object.entries(params).forEach(p => url.searchParams.set(...p))
  return url
}

const fetchWrapper = async (
  url: string | URL,
  options?: RequestInit,
  fetchFunction?: typeof fetch
): FetcherResponse<Response> => {
  const func = fetchFunction ?? fetch
  const res = await func(url, options).catch(err => err as Error);

  if (res instanceof Error) return [500, `Unable to fetch: ${res.name} ${res.message}`]
  if (!res.ok) return [500, `${url} returned ${res.status}`]

  return res
}

const fetchJson = async <T>(
  url: string | URL,
  options?: RequestInit,
  fetchFunction?: typeof fetch
): FetcherResponse<T> => {
  const res = await fetchWrapper(url, options, fetchFunction)

  if (Array.isArray(res)) return res

  try {
    const json = await res.json()
    return json as T
  } catch (err) {
    if (err instanceof SyntaxError) return [500, 'Response is not JSON']

    return [500, 'Cannot parse response']
  }
}

const fetchText = async (
  url: string | URL,
  options?: RequestInit,
  fetchFunction?: typeof fetch
): Promise<string | [number, string]> => {
  const res = await fetchWrapper(url, options, fetchFunction)

  if (Array.isArray(res)) return res

  try {
    const text = await res.text()
    return text
  } catch (err) {
    return [500, 'Cannot parse response']
  }
}

const isError = (res: unknown): res is [number, string] => {
  return Array.isArray(res)
    && res.length === 2
    && typeof res[0] === 'number'
    && typeof res[1] === 'string'
}

export const fetcher = {
  makeUrl,
  fetchWrapper,
  fetchText,
  fetchJson,
  isError,
}

export default fetcher
