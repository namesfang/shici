<!--/ 诗词通用列表 /-->
<script lang="ts">
	import Empty from "./Empty.svelte";

  export let posts: any[];

  export let keyword: string;

  export let withTabs = false;

</script>

<div style={withTabs?'--height-tab: 116px':'--height-tab: 0px'}>
{#if posts.length > 0}
  <div class="posts">
    {#each posts as list, index}
    <ul>
      {#each list as t, i}
      <li>
        <a href="/{t.dynastyId}/{t.id}" title={t.title}><span>{index * 20 + i+1}.</span> {@html t.title.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)} <span>{t.author.fullname}</span></a>
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
</div>

<style lang="scss">
  .posts {
    width: 1200px;
    height: auto;
    overflow: hidden;
    min-height: calc(100vh - var(--height-header) - var(--height-footer) - 80px - 64px);
    margin: 40px auto;
    ul {
      width: 287px;
      float: left;
      margin-right: 17px;
      &:last-child {
        margin-right: 0;
      }
      li {
        width: 100%;
        line-height: 38px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          font-size: 16px;
          color: var(--gray-700);
          position: relative;

          span {
            color: var(--gray-400);
          }
          
          &:hover {
            // color: var(--primary-900);
            // span {
            //   color: var(--primary-900);
            // }
            &::after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              bottom: -3px;
              border-bottom: 2px solid var(--primary-900);
            }
          }
        }
      }
    }
  }

  .empty {
    display: flex;
    height: calc(100vh - var(--height-header) - var(--height-footer) - var(--height-tab) - 64px);
  }
</style>