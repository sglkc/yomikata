import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import extractorSvelte from '@unocss/extractor-svelte'

export default defineConfig({
	plugins: [
    unocss({
      extractors: [ extractorSvelte() ],
    }),
    sveltekit(),
  ],
});
