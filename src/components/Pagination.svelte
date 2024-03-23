<script lang="ts">
  import { page } from "$app/stores";
	import { throttle } from "throttle-debounce";
  
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
  // 当前页码
  export let pageCurrent = 1;

  // 分页最多放几个
  const pagerMax = 9;
  
  const searchParams = $page.url.searchParams

  //
  let typing = ''

  // 总页数
  let pageCount: number = 0;

  let pager: Item[] = []

  const makePager = (page: number, dot = false)=> {
    const value = String(page)
    searchParams.set('page', value)
    return {
      dot,
      page,
      text: dot ? '...' : value,
      url: dot ? '' : '?' + searchParams.toString()
    }
  }

  $: {
    
    // 总页数
    pageCount = count > 0 ? Math.ceil(count / take) : 0;

    //
    const newPager = []

    if(pageCount > 1) {
      newPager.push(makePager(1))
    }

    if(pageCount <= pagerMax) {
      for(let i=2; i<=pageCount-1; i++) {
        newPager.push(makePager(i))
      }
    } else {
      // 分页页码第一页
      // 1 2 3 4 5 6 7 8 9 ... 304
      if(pageCurrent < pagerMax - 2) {
        for(let i=2; i<pagerMax - 1; i++) {
          newPager.push(makePager(i))
        }
        // 添加... 
        newPager.push(makePager(0, true))
      }
      // 1 ... 297 298 299 300 301 302 303 304
      // 分页页码最后一页
      else if(pageCurrent > pageCount - pagerMax + 2) {
        // 添加...
        newPager.push(makePager(0, true))
        for(let i=pageCount - pagerMax + 2; i<pageCount; i++) {
          newPager.push(makePager(i))
        }
      }
      // 其他
      // 1 ... 14 15 16 17 18 19 20 ... 304
      else {
        // 添加...
        newPager.push(makePager(0, true))
        for(let i=pageCurrent-3; i<=pageCurrent + 3; i++) {
          newPager.push(makePager(i))
        }
        // 添加...
        newPager.push(makePager(0, true))
      }
    }

    if(pageCount > 1) {
      newPager.push(makePager(pageCount))
    }
    pager = [...newPager]
  }

  const d = throttle(500, (inputElement: HTMLInputElement)=> {
    
    if(null === typing) {
      return
    }

    inputElement?.blur()

    const value = Number(typing.toString().replace(/^[^\d]$/, ''))

    typing = Math.max(Math.min(pageCount, value), 1).toString()

    setTimeout(()=> inputElement?.focus())
  })


  const keyup = ({ target }: KeyboardEvent)=> {
    d(target as HTMLInputElement)
  }
</script>

{#if count > 0}
<div class="pagination">
  <p>共{count}条，每页{take}条，共{pageCount}页</p>
  {#if pager.length > 1}
    {#if pageCount > pagerMax}
    <form>
      <input on:keyup={ keyup } type="number" name="page" step="1" bind:value={typing} placeholder="跳转"/>
    </form>
    {/if}
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
  {/if}
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
      padding-left: 20px;
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
      margin-left: 20px;
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