<script lang="ts">
  import Empty from '$component/Empty.svelte';
  import Pagination from "$component/Pagination.svelte";
	import SearchToolbar from '$component/SearchToolbar.svelte';
	import Tabs from '$component/search/Tabs.svelte';

  //
  export let data;

  const items = data.locals.dict.search_type

  $: keyword = data.keyword ?? ''
  $: title = keyword ? `“${keyword}”诗词内容搜索结果` : ''

  $: pageCurrent = data.page
  $: count = data.count
</script>


<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {title} {keyword}/>

<Tabs type="content" {keyword} {items}/>

{#if data.contents.length > 0}
  <div class="posts">
    {#each data.contents as list, index}
    <ul>
      {#each list as t, i}
      <li>
        <a href="/{t.post.dynastyId}/{t.post.id}"><span>{index * 20 + i+1}</span>. {t.post.title} • {@html t.content.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)}</a>
      </li>
      {/each}
    </ul>
    {/each}
  </div>
{:else}
  <div class="empty">
    <Empty tips={`未搜索到“${keyword}”相关诗词内容`}/>
  </div>
{/if}
  
<Pagination {pageCurrent} {count} take={60}/>

<style lang="scss" scoped>

  .empty {
    display: flex;
    height: calc(100vh - var(--height-header) - var(--height-footer) - 64px - 116px);
  }

  .posts {
    width: 1200px;
    height: auto;
    overflow: hidden;
    margin: 20px auto;
    ul {
      width: 380px;
      height: auto;
      float: left;
      margin-right: 30px;
      &:last-child {
        margin: 0;
      }
      li {
        a {
          line-height: 36px;
          font-size: 16px;
          position: relative;
          color: var(--gray-700);

          span {
            color: var(--gray-400);
          }

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
</style>