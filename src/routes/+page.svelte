<script lang="ts">
import Button from '$lib/components/Button.svelte'
import Card from '$lib/components/Card.svelte'
import Input from '$lib/components/Input.svelte'
import { alertStore } from '$lib/stores/page-store'

let chapterUrl = ''

const paste = () => navigator.clipboard.readText()
  .then((text) => {
    chapterUrl = decodeURIComponent(text.trim())

    if (!URL.canParse(chapterUrl)) throw EvalError()

    alertStore.set(['success', 'Pasted!'])
  })
  .catch((error: Error) => {
    let message = 'Unexpected error :('
    switch (error.name) {
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

    console.error(error)
    alertStore.set(['error', message])
  })
</script>

<div>
  <p class="text-8">Read comics in any language?</p>
  <h2 class="fw-bold text-12">Try it now!</h2>
</div>
<form
  class="w-full grid grid-cols-12 gap-4"
  action="/read"
  method="get"
>
  <Input
    class="col-span-12 b-base b-2"
    placeholder="Paste chapter link here!"
    name="url"
    bind:value={chapterUrl}
  />
  <Button
    card-class="col-span-6 bg-green-300 fw-bold"
    type="submit"
  >
    Go!
  </Button>
  <Button card-class="col-span-6 bg-blue-300" type="button" on:click={paste}>
    <p class="fw-medium">...or paste from clipboard!</p>
    <small class="text-xs">(Press allow for permission)</small>
  </Button>
</form>
