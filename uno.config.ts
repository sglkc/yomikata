import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        mci: () => import('@iconify-json/mingcute/icons.json').then(i => i.default)
      },
      warn: true,
    })
  ],
  shortcuts: {
    'bg-base': 'bg-white dark:bg-black',
    'text-base': 'text-gray-900 dark:text-gray-300',
    'b-base': 'b-black dark:border-white',
    'colors-primary': 'bg-black text-white dark:bg-white dark:text-black',
    'colors-secondary': 'bg-white text-black dark:bg-black dark:text-white',
  },
  theme: {
    fontFamily: {
      heading: '"Bricolage Grotesque Variable", sans-serif',
      body: '"Sora Variable", sans-serif',
    },
    backgroundColor: {
      primary: '',
      secondary: '',
    },
    borderColor: {
      primary: '',
      secondary: '',
    },
    textColor: {
      primary: '',
      secondary: '',
    },
    boxShadow: {
      base: '4px 4px',
      sm: '8px 8px',
      md: '16px 16px'
    }
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('on:')) return matcher
      return {
        matcher: matcher.slice(3),
        selector: s => `${s}:hover, ${s}:focus`,
      }
    },
  ],
})
