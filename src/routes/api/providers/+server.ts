import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = () => {
  const imports = import.meta.glob('$lib/providers/*.ts', {
    eager: true,
    import: 'details',
  })

  const providers = Object.values(imports)
  return json({ providers })
}
