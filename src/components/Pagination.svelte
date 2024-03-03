<script lang="ts">
  import { page } from "$app/stores";
  type Pages = {
    text: string;
    num: number;
  }

  // 页尺寸
  export let take = 20;
  // 总条数
  export let count = 0;
  // 跳转地址
  export let url: string;

  const pagLength = 9;

  const pages: Pages[] = []

  $: pageCount = count > 0 ? Math.ceil(count / take) : 0;

  $: pageCurrent = $page.url.searchParams.get('page') ?? 1;

  $: {
    if(pageCount <= pagLength) {
      for(let i=1; i<=pagLength; i++) {
        pages.push({
          num: i,
          text: String(i)
        })
      }
    } else {
      const max = Math.floor(pagLength / 2);
      for(let i=1; i<=max; i++) {
        pages.push({
          num: i,
          text: String(i)
        })
      }
      pages.push({
        num: -1,
        text: '...'
      })

      for(let i=pageCount - max + 1; i<=pageCount; i++) {
        pages.push({
          num: i,
          text: String(i)
        })
      }
    }
  }

  

</script>
<div class="pagination">
  <p>共{pageCount}页，每页{take}条</p>
  <form>
    <input type="number" name="page" placeholder="跳转"/>
  </form>
  <ul>
    {#each pages as item}
      {#if item.num > 0}
        {#if pageCurrent == item.num}
          <li class="active">
            <span>{item.text}</span>
          </li>
        {:else}
          <li>
            <a href="{url}?page={item.num}">{item.text}</a>
          </li>
        {/if}
      {:else}
        <li>
          <span>{item.text}</span>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style lang="scss">
  .pagination {
    height: 46px;
    display: flex;
    justify-content: right;
    align-items: center;
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
        border: 1px solid var(--gray-400);
        border-radius: 5px;
      }
    }

    ul {
      display: flex;
      li {
        a, span {
          font-size: 14px;
          color: var(--gray-700);
          display: flex;
          padding: 8px 12px;
          margin-right: 6px;
        }

        span {
          color: var(--gray-400);
        }
      }

      .active {
        span {
          color: var(--white);
          background-color: var(--primary-500);
        }
      }
    }
  }
</style>