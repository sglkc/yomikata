<script>
import clsx from 'clsx'
</script>

<div
  class={clsx(
    'fixed inset-0 bg-black/10 grid justify-center items-center',
    $$props.class,
  )}
  role="presentation"
  on:click
>
  <slot />
</div>
