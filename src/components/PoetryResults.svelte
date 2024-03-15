<!--/ 诗词通用列表 /-->
<script lang="ts">
	import Empty from "./Empty.svelte";

  export let posts: any[];

  export let keyword: string;

</script>

{#if posts.length > 0}
  <div class="posts">
    {#each posts as list, index}
    <ul>
      {#each list as t, i}
      <li>
        <a href="/{t.dynastyId}/{t.id}">{index * 20 + i+1}. {t.author.fullname} • {@html t.title.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)}</a>
      </li>
      {/each}
    </ul>
    {/each}
  </div>
{:else}
  <div class="empty">
    <Empty tips={`未搜索到“${keyword}”相关诗词`}/>
  </div>
{/if}

<style lang="scss">
  .posts {
    width: 1200px;
    display: grid;
    grid-template-rows: 1;
    grid-template-columns: repeat(4, 25%);
    margin: 40px auto;
    ul {
      li {
        a {
          line-height: 36px;
          font-size: 14px;
          position: relative;
          &:hover {
            &::after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              bottom: -3px;
              border-bottom: 2px solid var(--primary-900);
              transition: all .5;
            }
          }
        }
      }
    }
  }

  .empty {
    display: flex;
    height: calc(100vh - var(--height-header) - var(--height-footer) - 64px);
  }
</style>