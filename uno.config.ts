import { defineConfig } from 'unocss'

export default defineConfig({
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
