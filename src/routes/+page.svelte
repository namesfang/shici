<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>{data.locals.title}|首页</title>
</svelte:head>

<div class="wrapper">
</div>

<style lang="scss" scoped>
  .wrapper {
    height: calc(100vh - var(--height-header) - var(--height-footer));
  }
</style>
