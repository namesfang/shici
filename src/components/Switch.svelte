<script lang="ts">
	import { createEventDispatcher } from "svelte";

  export let active = '';
  export let inactive = '';

  export let name = '';

  export let value = false;

  const dispatch = createEventDispatcher()

  const toggle = ()=> {
    value = !value
    dispatch('change', value)
  }
</script>

<button on:click={ toggle } class="switch" class:active={ value } type="button">
  <i></i>
  <span>{ value ? active : inactive }</span>
</button>

{#if name}
  <input { name } type="hidden" bind:value={ value }/>
{/if}

<style lang="scss">
  .switch {
    height: 30px;
    display: inline-block;
    padding: 5px;
    border-radius: 15px;
    background-color: var(--gray-200);
    border: 0;
    position: relative;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    
    i {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--white);
      float: left;
    }

    span {
      min-width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: var(--gray-800);
      padding: 0 5px;
      display: inline-block;
    }
  }

  .active {
    background-color: var(--primary-900);
    i {
      float: right;
    }
    span {
      color: var(--white);
    }
  }
</style>