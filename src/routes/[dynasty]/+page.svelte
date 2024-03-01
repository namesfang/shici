<script lang="ts">
  import Pagination from "$component/Pagination.svelte";
  //
  export let data;

</script>

<h1>诗词列表</h1>
<ul>
  {#each data.list as t}
  <li>
    <a href="/{data.dynasty}/{t.title}">{t.title}</a>
  </li>
  {/each}
</ul>

<Pagination count={data.count} url={data.dynasty}/>