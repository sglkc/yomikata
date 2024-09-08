<script lang="ts">
import Card from '$lib/components/Card.svelte'
import Input from '$lib/components/Input.svelte'
</script>

<div class="grid cols-12 gap-4">
  <Input class="col-span-10" placeholder="Enter manga chapter URL..." />
  <Card class="col-span-2" pop>Paste</Card>
  <Card class="col-span-12 bg-green-300" pop>Go!</Card>
</div>
