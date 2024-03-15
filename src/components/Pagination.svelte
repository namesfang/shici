<script lang="ts">
  import { page } from "$app/stores";
  
  type Item = {
    text: string;
    page: number;
    dot: boolean;
    url: string;
    active?: boolean;
  }

  // 页尺寸
  export let take = 20;
  // 总条数
  export let count = 0;

  // 分页最多放几个
  const pagerMax = 9;
  
  // 总页数
  let pageCount: number;
  // 当前页码
  let pageCurrent: number;
  // 上一个访问的页码
  let pageVisited: number;

  let pager: Item[] = []

  const searchParams = $page.url.searchParams

  const pushPager = (page: number, dot = false)=> {
    searchParams.set('page', String(page))
    pager.push({
      dot,
      page,
      text: dot ? '...' : String(page),
      url: dot ? '' : searchParams.toString()
    })
  }

  // 访问记录
  $: pageVisited = pageCurrent
  // 总页数
  $: pageCount = count > 0 ? Math.ceil(count / take) : 0;
  // 当前页码
  $: pageCurrent = Number(searchParams.get('page') ?? 1);

  console.log(pageCount, 'co')

  if(pageCount <= pagerMax) {
    for(let i=1; i<=pageCount; i++) {
      pushPager(i)
    }
  } else {
    // 1 2 3 4 5 6 7 8 . 9
    // 1 . 4 5 6 7 8 . 18
    // 1 . 13 14 15 16 17 18
    if(pageCurrent < pagerMax - 2) {
      for(let i=1; i<pagerMax - 1; i++) {
        pushPager(i)
      }
      // 
      pushPager(0, true)
    } else if(pageCurrent > pageCount - 2) {
      // 
      pushPager(0, true)
      for(let i=pageCount - pagerMax + 2; i<pageCount; i++) {
        pushPager(i)
      }
    } else {
      pushPager(0, true)
      for(let i=pageCurrent-3; i<=pageCurrent + 3; i++) {
        pushPager(i)
      }
      pushPager(0, true)
    }
  }
</script>
{#if pager.length > 1}
  <div class="pagination">
    <p>共{count}条，每页{take}条，共{pageCount}页</p>
    <form>
      <input type="number" name="page" placeholder="跳转"/>
    </form>
    <ul>
      {#each pager as item}
        {#if pageCurrent == item.page}
          <li class="active">
            <span>{item.text}</span>
          </li>
        {:else if false === item.dot }
          <li>
            <a href={item.url}>{item.text}</a>
          </li>
        {:else}
          <li>
            <span>{item.text}</span>
          </li>
        {/if}
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .pagination {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 0;
    p {
      font-size: 14px;
      color: var(--gray-700);
    }
    form {
      padding: 0 20px;
      input {
        width: 50px;
        height: 30px;
        padding: 0 10px;
        font-size: 14px;
        border: 0;
        border-radius: 4px;
        background-color: var(--gray-100);
        &:focus {
          outline: 3px solid var(--primary-900);
        }
      }
    }

    ul {
      display: flex;
      li {
        a, span {
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          color: var(--gray-700);
          display: flex;
          padding: 0 12px;
          margin-right: 6px;
          border-radius: 4px;
        }

        a {
          &:hover {
            color: var(--primary-900);
          }
        }
      }

      .active {
        span {
          color: var(--white);
          background-color: var(--primary-900);
        }
      }
    }
  }
</style>