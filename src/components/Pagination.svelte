<script lang="ts">
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

<div class="">
  <p>共{pageCount}页，每页{take}条</p>
  <input type="number" />
  <ul>
    {#each pages as item}
      {#if item.num > 0}
        <li>
          <a href="{url}?page={item.num}">{item.text}</a>
        </li>
      {:else}
        <li>
          <span>{item.text}</span>
        </li>
      {/if}
    {/each}
  </ul>
</div>