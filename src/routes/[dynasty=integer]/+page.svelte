<script lang="ts">
  import Empty from '$component/Empty.svelte';
  import Pagination from "$component/Pagination.svelte";

  import { page } from '$app/stores'
  //
  export let data;

  let keyword = $page.url.searchParams.get('keyword') ?? ''

</script>
<svelte:head>
  <title>{data.dynasty.name}|{data.locals.title}</title>
</svelte:head>

<div class="toolbar">
  <div class="inner">
    <h2>诗词列表</h2>
    <form>
      <input type="text" name="keyword" bind:value={ keyword }/>
      <button type="submit">搜索</button>
    </form>
  </div>
</div>

{#if data.posts.length > 0}
  <div class="posts">
    {#each data.posts as list, index}
    <ul>
      {#each list as t, i}
      <li>
        <a href="/{t.dynastyId}/{t.id}">{index * 20 + i+1}. {t.title}</a>
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
  
<div class="pag">
  <Pagination count={data.count} url={`/${data.dynasty.id}`} take={80}/>
</div>

<style lang="scss" scoped>
  .pag {
    width: 1200px;
    margin: 0 auto 40px;
    display: flex;
    justify-content: center;
  }

  .empty {
    display: flex;
    height: calc(100vh - var(--height-header) - var(--height-footer) - 64px);
  }

  .toolbar {
    height: 64px;
    background-color: var(--gray-100);

    .inner {
      width: 1200px;
      height: 64px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 16px;
        color: var(--gray-600);
      }

      form {
        display: flex;
        input {
          height: 20px;
          padding: 6px 12px;
          border: 0;
          background-color: var(--white);
          border-radius: 4px 0 0 4px;
          &:focus {
            outline: 4px solid var(--primary-200);
          }
        }
        button {
          width: 50px;
          color: var(--white);
          height: 32px;
          border: 0;
          border-radius: 0 4px 4px 0;
          background-color: var(--primary-900);
          &:active {
            font-size: 15px;
          }
        }
      }
    }
  }

  .posts {
    width: 1200px;
    display: flex;
    margin: 20px auto;
    ul {
      flex: 1;
      li {
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
        }
      }
    }
  }
</style>