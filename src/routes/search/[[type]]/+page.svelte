<script lang="ts">
  import Empty from '$component/Empty.svelte';
  import Pagination from "$component/Pagination.svelte";

  //
  export let data;

  const tabs = [
    {
      label: '诗词'
    },
    {
      label: '作者'
    },
    {
      label: '句子'
    }
  ]

  let title = ''
  let keyword = ''
  let type = 0

  $: {
    keyword = data.keyword ?? ''
    type = Number(data.type) ?? 0
    title = keyword ? `“${keyword}”${tabs.find((t, i)=> i == type)?.label}搜索结果` : ''
  }

</script>


<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>


<div class="toolbar">
  <div class="inner">
    <h2>{title}</h2>
    <form>
      <input type="text" name="keyword" bind:value={ keyword }/>
      <button type="submit">搜索</button>
    </form>
  </div>
</div>

<div class="tab">
  <ul>
    {#each tabs as {label}, index }
    <li>
      <a href={`/search/${index}?keyword=${keyword}`} class={type == index ? 'active' : ''}>{label}</a>
    </li>
    {/each}
  </ul>
</div>

{#if data.posts.length > 0}
  <div class="posts">
    {#each data.posts as list, index}
    <ul>
      {#each list as t, i}
      <li>
        <a href="/{t.dynastyId}/{t.id}">{index * 20 + i+1}. {@html t.title.replaceAll(keyword, `<em style="color: var(--primary-600)">${keyword}</em>`)}</a>
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
  <Pagination count={data.count} url="" take={80}/>
</div>

<style lang="scss" scoped>

  .tab {
    height: 36px;
    margin: 40px 0;
    position: relative;
    &::after {
      content: "";
      border-bottom: 2px solid var(--primary-700);
      position: absolute;
      inset: auto 0 0 0;
    }

    ul {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      li {
        margin-right: 20px;
        a {
          width: 80px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          display: block;
          overflow: hidden;
          position: relative;
        }

        .active {
          color: var(--white);
          &::before {
            content: "";
            width: 65px;
            height: 65px;
            z-index: -1;
            transform-origin: 0 0;
            transform: rotate(15deg);
            background-color: var(--primary-700);
            position: absolute;
            left: 15px;
            top: -20px;
          }
        }
      }
    }
  }

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