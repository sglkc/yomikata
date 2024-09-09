<script lang="ts">
import Button from '$lib/components/Button.svelte'
import Card from '$lib/components/Card.svelte'
import Input from '$lib/components/Input.svelte'
import { alertStore } from '$lib/stores/page-store'

let mangaUrl = ''

const paste = () => navigator.clipboard.readText()
  .then((text) => {
    mangaUrl = decodeURIComponent(text.trim())
    alertStore.set(['success', 'Processing url...'])
  })
  .catch((error: Error) => {
    let message = 'Unexpected error :('
    switch (error.name) {
      case 'URIError':
        message = 'The copied url link is broken'
        break
      case 'NotAllowedError':
        message = 'Clipboard permission was denied :('
        break
      case 'NotFoundError':
        message = 'Copied thing is not a text'
        break
    }

    console.error(error)
    alertStore.set(['error', message])
  })
</script>

<div class="grid cols-12 gap-4">
  <div class="col-span-full">
    <p class="text-8">Read comics in any language?</p>
    <h2 class="fw-bold text-12">Try now it now!</h2>
  </div>
  <Input
    class="col-span-12 b-base b-2"
    placeholder="Paste chapter link here!"
    bind:value={mangaUrl}
  />
  <Button
    class="col-span-6 bg-green-300 fw-bold"
    on:click={() => console.log('eee')}
  >
    Go!
  </Button>
  <Button class="col-span-6 bg-blue-300" on:click={paste}>
    <p class="fw-medium">...or paste from clipboard!</p>
    <small class="text-xs">(Press allow for permission)</small>
  </Button>
  <Card class="col-span-4 row-span-5">testsitstiskdjfkj</Card>
  <Card class="col-span-8">HELLO<br/>HELLO</Card>
  <Card class="col-span-4"></Card>
  <Card class="col-span-4"></Card>
  <Card class="col-span-8 row-span-2"></Card>
  <Card class="col-span-8"></Card>
</div>
