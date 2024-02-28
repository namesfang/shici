<script lang="ts">
export let data;

</script>

<h1>诗词列表</h1>
<ul>
  {#each data.list as t}
  <li>
    <a href="/{t.title}">{t.title}</a>
  </li>
  {/each}
</ul>