<script lang="ts">
import { goto } from '$app/navigation'
import Button from '$lib/components/Button.svelte'
import Card from '$lib/components/Card.svelte'
import Input from '$lib/components/Input.svelte'
import { mangaUrl, alertStore } from '$lib/stores/page-store'

const sanitizeUrl = (url: string) => {
  try {
    if (!url || !url.length) throw SyntaxError()

    mangaUrl.set(decodeURIComponent(url.trim()))

    if (!URL.canParse($mangaUrl)) throw EvalError()

    alertStore.set(['success', 'Pasted!'])
  } catch (error) {
    let message = 'Unexpected error :('

    switch ((error as Error).name) {
      case 'SyntaxError':
        message = 'Copied url is empty'
        break
      case 'URIError':
        message = 'Copied url link is broken'
        break
      case 'NotAllowedError':
        message = 'Clipboard permission was denied :('
        break
      case 'NotFoundError':
        message = 'Copied thing is not a text'
        break
      case 'EvalError':
        message = 'Copied text is not a url'
        break
    }

    alertStore.set(['error', message])
  }
}

const onPaste = (e: ClipboardEvent) => {
  let text = e.clipboardData?.getData('text') ?? ''
  e.preventDefault()
  sanitizeUrl(text)
}

const clickPaste = async () => {
  const text = await navigator.clipboard.readText()
  sanitizeUrl(text)
}

const onSubmit = (e: SubmitEvent) => {
  e.preventDefault()
  goto('/read')
}
</script>

<div>
  <p class="text-8">Read comics in any language?</p>
  <h2 class="fw-bold text-12">Try it now!</h2>
</div>
<form
  class="w-full grid grid-cols-12 gap-4"
  on:submit={onSubmit}
>
  <Input
    class="col-span-12 b-base b-2"
    placeholder="Paste chapter link here!"
    name="manga-url"
    type="url"
    title="Manga chapter URL"
    required
    on:paste={onPaste}
    bind:value={$mangaUrl}
  />
  <Button
    card-class="col-span-6 bg-blue-300"
    type="button"
    on:click={clickPaste}
  >
    <p class="fw-medium">Paste from clipboard!</p>
    <small class="text-xs">(Press allow for permission)</small>
  </Button>
  <Button
    card-class="col-span-6 bg-green-300 fw-bold"
    type="submit"
  >
    Go!
  </Button>
</form>
