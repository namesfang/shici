<script lang="ts">

	import Icon from "./Icon.svelte";
	import Select from "./Select.svelte";

  let type = 3;

  let options = [
    {
      value: 1,
      label: '诗词标题'
    },
    {
      value: 2,
      label: '诗词作者'
    },
    {
      value: 3,
      label: '诗词内容'
    }
  ]

  $: action = `/search/${type}`
</script>

<form { action } style="--height: 46px">
  <div>
    <Select large bind:options={ options } bind:value={ type }/>
  </div>
  <input name="keyword" autocomplete="off" type="text" placeholder="输入关键字搜索"/>
  <button type="submit">
    <Icon type="search" medium/>
  </button>
</form>

<style lang="scss">
  form {
    position: relative;
    display: flex;

    div {
      width: 100px;
		  margin-right: 10px;
    }
    
    input {
      width: 320px;
      height: var(--height);
      padding: 0 0 0 12px;
      background-color: var(--white);
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid var(--gray-300);

      &:hover {
        border-color: var(--gray-400);
      }

      &:focus {
        border-color: transparent;
        outline: 3px solid var(--primary-900);
      }
    }

    button {
      width: var(--height);
      height: var(--height);
      border: 0;
      border-radius: 5px;
      background-color: transparent;
      position: absolute;
      inset: 1px;
      left: inherit;
      :global(i) {
        color: var(--gray-300);
      }
    }
  }
</style>