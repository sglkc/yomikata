<script lang="ts">
import Card from '$lib/components/Card.svelte';
import Link from '$lib/components/Link.svelte';
import type { PageData } from './$types'

export let data: PageData
</script>

<h2 class="fw-bold font-heading text-12">Supported sites</h2>
<p class="mb-2">
  Since images are scraped online, support is very limited.
  If your site is not listed, you may request a provider by
  <Link href="https://github.com/sglkc/yomikata/issues">creating an issue</Link>
  or
  <Link href="https://github.com/sglkc/yomikata/pulls">
    develop yourself
  </Link>.
</p>
<ul class="grid grid-cols-12 gap-4">
  {#each data.providers as provider}
    <Card element="li" class="col-span-4 grid gap-2">
      <h3 class="fw-medium text-6">{ provider.name }</h3>
      <p><Link href={'//' + provider.url} target="_blank">{ provider.url }</Link></p>
      <p class="text-sm">{ provider.matcher }</p>
    </Card>
  {/each}
</ul>
