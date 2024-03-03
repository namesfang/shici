<script lang="ts">
  import Pagination from "$component/Pagination.svelte";
  //
  export let data;

</script>
<form>
  <input type="text" name="keyword"/>
  <button type="submit">搜索</button>
</form>
<h1>诗词列表</h1>
<ul>
  {#each data.list as t}
  <li>
    <a href="/{t.dynastyId}/{t.id}">{t.title}</a>
  </li>
  {/each}
</ul>

<Pagination count={data.count} url={data.dynasty}/>