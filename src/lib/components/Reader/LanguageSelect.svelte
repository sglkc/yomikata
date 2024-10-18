<script lang="ts">
import { languages } from 'google-translate-api-x'
import { translateLang } from '$lib/stores/reader-store'
import Select from '../Select.svelte'

const items = Object.entries(languages)
  .map(([k, v]) => ({ label: String(v), value: k }))
  .filter(({ label }) => label !== 'Automatic')
</script>

<Select value={$translateLang} {items}>
  <div slot="icon" class="i-mci:translate-2-line text-2xl"></div>
</Select>
