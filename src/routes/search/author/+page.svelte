<script lang="ts">
  import Empty from '$component/Empty.svelte';
  import Pagination from "$component/Pagination.svelte";
	import SearchToolbar from '$component/SearchToolbar.svelte';
	import Tabs from '$component/search/Tabs.svelte';

  export let data;

  let title = ''
  let keyword = ''

  const items = data.locals.dict.search_type

  $: {
    keyword = data.keyword ?? ''
    title = keyword ? `“${keyword}”诗词作者搜索结果` : ''
  }
</script>

<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {title} {keyword}/>

<Tabs type="author" {keyword} {items}/>

{#if data.list.length > 0}
  <div class="records">
    <ul>
      {#each data.list as t, index}
      <li>
        <a href="/author/{t.id}">
          <h2>{index + 1}. {@html t.fullname.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)}</h2>
          <p>{t.profiles ? t.profiles : '暂无作者简介'}</p>
        </a>
      </li>
      {/each}
    </ul>
  </div>
{:else}
  <div class="empty">
    <Empty tips={`未搜索到“${keyword}”相关诗词`}/>
  </div>
{/if}
  
<Pagination count={data.count}/>

<style lang="scss" scoped>

  .empty {
    display: flex;
    height: calc(100vh - var(--height-header) - var(--height-footer) - 64px);
  }

  .records {
    width: 1200px;
    display: flex;
    margin: 40px auto;
    ul {
      flex: 1;
      li {
        margin-top: 20px;
        &:last-child {
          margin-bottom: 0;
        }
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

          h2 {
            height: 40px;
            color: var(--gray-700);
          }

          p {
            font-size: 14px;
            line-height: 22px;
            color: var(--gray-500);
          }
        }
      }
    }
  }
</style>