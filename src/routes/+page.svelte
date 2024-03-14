<script lang="ts">
	import SearchBox from "$component/SearchBox.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.locals.title}</title>
</svelte:head>

<div class="wrapper">
  <SearchBox />
</div>

<style lang="scss" scoped>
  .wrapper {
    height: calc(100vh - var(--height-header) - var(--height-footer));
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
