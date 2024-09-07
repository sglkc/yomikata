<script lang="ts">
import Card from '$lib/components/Card.svelte'
</script>

<div class="grid cols-12 gap-4">
  <Card class="col-span-6 row-span-2 bg-pink-300" pop>
    <a
      class="absolute inset-0 flex justify-center items-center fw-bold text-4xl"
      href="/read"
    >
      READ NOW!
    </a>
  </Card>
  <Card class="col-span-3 row-span-2 bg-green-300" pop>
    <a
      class="absolute inset-0 flex justify-center items-center fw-bold text-4xl"
      href="/read"
    >
      ABOUT
    </a>
  </Card>
  <Card class="col-span-3">Repository</Card>
  <Card class="col-span-3">Report an issue</Card>
</div>
