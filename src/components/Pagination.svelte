<script lang="ts">
  import { page } from "$app/stores";
  
  type Item = {
    text: string;
    page: number;
    dot: boolean;
    active?: boolean;
  }

  // 页尺寸
  export let take = 20;
  // 总条数
  export let count = 0;
  // 跳转地址
  export let url: string;

  export let pagesCount = 0;

  const pagesTotal = 9;
  
  let pageCount: number;
  let pageCurrent: number;
  let pageVisited: number;

  const pages: Item[] = []

  $: {
    pages.splice(0)
    
    // 访问记录
    pageVisited = pageCurrent
    // 总页数
    pageCount = count > 0 ? Math.ceil(count / take) : 0;
    // 当前页码
    pageCurrent = Number($page.url.searchParams.get('page') ?? 1);

    console.log('ddd', pageCurrent)

    // 第一页
    if(pageCount > 1) {
      pages.push({
        dot: false,
        page: 1,
        text: String(1),
      })
    }

    if(pageCount <= pagesTotal) {
      for(let i=2; i<pageCount; i++) {
        pages.push({
          dot: false,
          page: i,
          text: String(i)
        })
      }
    } else {
      // 1 2 3 4 5 6 7 8 . 9
      // 1 . 4 5 6 7 8 . 18
      // 1 . 13 14 15 16 17 18
      if(pageCurrent < pagesTotal - 2) {
        for(let i=2; i<pagesTotal - 1; i++) {
          pages.push({
            dot: false,
            page: i,
            text: String(i)
          })
        }
        // 
        pages.push({
          dot: true,
          page: 0,
          text: '...'
        })
        console.log('pages1', pages)
      } else if(pageCurrent > pageCount - 2) {
        // 
        pages.push({
          dot: true,
          page: 0,
          text: '...'
        })
        for(let i=pageCount - pagesTotal + 2; i<pageCount; i++) {
          pages.push({
            dot: false,
            page: i,
            text: String(i)
          })
        }
        console.log('pages2', pages)
      } else {
        pages.push({
          dot: true,
          page: 0,
          text: '...'
        })
        for(let i=pageCurrent-3; i<=pageCurrent + 3; i++) {
          pages.push({
            dot: false,
            page: i,
            text: String(i)
          })
        }
        pages.push({
          dot: true,
          page: 0,
          text: '...'
        })
      }
    }

    // 最后一页
    if(pageCount > 1) {
      pages.push({
        dot: false,
        page: pageCount,
        text: String(pageCount),
      })
    }

    pagesCount = pages.length
  }

  console.log(typeof pages, 'pages./')
</script>
{#if pages.length > 1}
  <div class="pagination">
    <p>共{count}条，每页{take}条，共{pageCount}页</p>
    <form>
      <input type="number" name="page" placeholder="跳转"/>
    </form>
    <ul>
      {#each pages as item}
        {#if pageCurrent == item.page}
          <li class="active">
            <span>{item.text}</span>
          </li>
        {:else if false === item.dot }
          <li>
            <a href="{url}?page={item.page}">{item.text}</a>
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