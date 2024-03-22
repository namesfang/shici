<script lang="ts">
	import Icon from "./Icon.svelte";

  type Type = "button" | "submit" | "reset" | null | undefined
  
  export let icon = '';
  export let label = '';
  export let href = '';

  export let small = false;

  export let primary = false;
  export let success = false;
  export let warning = false;
  export let type: Type = 'button';

  $: className = primary ? 'primary' : (success ? 'success' : (warning ? 'warning' : ''))
</script>

{#if href.length > 0}
  <a { href } class={ className } style:--height={ small ? '20px' : '32px' } style:--font-size={ small ? '12px' : '14px' }>
    {#if icon}
      <Icon type={icon} small/>
    {/if}
    <slot>{label}</slot>
  </a>
{:else}
  <button on:click { type } class={ className } style:--height={ small ? '20px' : '32px' } style:--font-size={ small ? '12px' : '14px' }>
    {#if icon}
      <Icon type={icon} small/>
    {/if}
    <slot>{label}</slot>
  </button>
{/if}

<style lang="scss">
  a, button {
    height: var(--height);
    line-height: var(--height);
    font-size: var(--font-size);
    color: var(--gray-900);
    padding: 0 calc(var(--height) / 3);
    border: 0;
    box-sizing: border-box;
    display: inline-flex;
    border-radius: 4px;
    background-color: var(--gray-100);
    position: relative;

    &:active {
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 4px;
        background-color: rgba(0,0,0,.2);
      }
    }

    :global(i) {
      margin-right: 3px;
    }
  }

  .primary {
    color: var(--white);
    background-color: var(--primary-700);
    :global(i) {
      color: var(--white);
    }
  }

  .warning {
    color: #fff;
    background-color: var(--warning-900);
  }

  .success {
    color: #fff;
    background-color: var(--success-900);
  }
</style>