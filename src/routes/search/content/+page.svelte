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
        <li data-line={`${index * 20 + i+1}.`}>
          <a href="/{t.post.dynastyId}/{t.post.id}" data-from={t.post.title}>
            {#if keyword.length === 0}
              {t.content}
            {:else}
              <span>{@html t.content.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)}</span>
            {/if}
          </a>
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
              content: attr(data-from);
              font-size: 12px;
              color: var(--gray-600);
            }
          }
        }
      }
    }
  }
</style>