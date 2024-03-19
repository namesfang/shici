<script lang="ts">
  import Empty from '$component/Empty.svelte';

  export let authors: any[];
  export let keyword = '';


</script>

{#if authors.length > 0}
  <div class="records">
    <ul>
      {#each authors as t, index}
      <li>
        <a href="/author/{t.id}">
          <h2><span>{index + 1}.</span> {@html t.fullname.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)}</h2>
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

<style lang="scss">

  .empty {
    display: flex;
    height: calc(100vh - var(--height-header) - var(--height-footer) - 64px - 116px);
  }

  .records {
    width: 1200px;
    margin: 40px auto;
    ul {
      height: auto;
      overflow: hidden;
      li {
        height: auto;
        overflow: hidden;
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        a {
          padding: 10px 18px;
          display: block;
          position: relative;

          &:hover {
            border-radius: 10px;
            background-color: var(--gray-100);
          }

          h2 {
            line-height: 32px;
            font-size: 16px;
            color: var(--gray-700);
            span {
              color: var(--gray-400);
            }
          }

          p {
            font-size: 14px;
            text-indent: 2em;
            line-height: 22px;
            color: var(--gray-500);
          }
        }
      }
    }
  }
</style>