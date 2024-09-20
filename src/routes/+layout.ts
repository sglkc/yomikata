export const ssr = false
export const prerender = true
export function load({ url }) {
  return {
    pathname: url.pathname
  }
}
