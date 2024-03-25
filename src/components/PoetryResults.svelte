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
        <li data-line={ `${index * 20 + i+1}.` }>
          <a href="/{t.dynastyId}/{t.id}" title={t.title} data-author={ t.author.fullname }>
            {#if keyword.length === 0}
              {t.title}
            {:else}
              <span>{@html t.title.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)}</span>
            {/if}
          </a>
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
        height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;

        &::before {
          content: attr(data-line);
          font-size: 14px;
          color: var(--gray-500);
          padding-right: 5px;
        }
        

        a {
          line-height: 18px;
          font-size: 16px;
          color: var(--gray-900);
          position: relative;
          display: flex;
          flex-direction: column;
          
          &:hover {
            font-size: 14px;
            color: var(--gray-900);
            white-space: wrap;
            background-color: var(--gray-100);
            padding: 5px 10px 7px;
            border-radius: 6px;
            &::before {
              content: attr(data-author);
              font-size: 12px;
              color: var(--gray-600);
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