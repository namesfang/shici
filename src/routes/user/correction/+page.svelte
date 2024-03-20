<script lang="ts">
	import Action from "$component/Action.svelte";
	import Dialog from "$component/Dialog.svelte";
	import Pagination from "$component/Pagination.svelte";
	import { toast } from "$lib/broswer.js";

  export let data;

  let placeholder = '标题'
  let keyword = data.keyword

  $: list = data.list;
  $: count = data.count;

  let id = 0;
  let visible = false
  let title = ''

  const openDeleteDialog = async (fav: {id: number, title: string})=> {
    visible = true;
    id = fav.id;
    title = fav.title;
  }

  const deleteIt = async (close: ()=> void)=> {
    const result = await fetch('/api/favorite/delete', {
      method: 'POST',
      body: JSON.stringify({
        id
      })
    })

    const { code, msg } = await result.json()

    if(code == 0) {
      close()
      location.reload()
    }
    toast(msg, code > 0)
  }
</script>

<div class="toolbar">
  <form action="/user/correction" class="finder">
    <input type="text" name="keyword" { placeholder } bind:value={keyword}/>
    <Action type="submit" primary>搜索</Action>
  </form>
</div>

<table>
  <colgroup>
    <col width="50">
    <col width="auto">
    <col width="140">
    <col width="170">
  </colgroup>
  <thead>
    <tr>
      <th>#</th>
      <th align="left">诗词标题</th>
      <th>提交时间</th>
      {#if data.locals.user?.adm}
      <th>操作</th>
      {/if}
    </tr>
  </thead>
  <tbody>
    {#each list as fav, index }
      <tr>
        <td align="right">{ index + 1 }</td>
        <td align="left">
          <a href={`/${fav.post.dynastyId}/${fav.postId}`}>{ fav.post.title }</a>
        </td>
        <td align="center">{ fav.createdAt.toLocaleString() }</td>
        {#if data.locals.user?.adm}
          <td align="center" class="buttons">
            <Action on:click={ ()=> openDeleteDialog({id: fav.id, title: fav.post.title}) } small primary label="取消"/>
          </td>
        {/if}
      </tr>
    {/each}
    {#if count === 0}
      <tr>
        <td align="center" colspan="4">暂无数据</td>
      </tr>
    {/if}
  </tbody>
</table>

<Dialog confirmAction={ deleteIt } bind:visible={visible} title="确认删除" content={`确定删除此“${title}”收藏？`}></Dialog>

<Pagination {count} />

<style lang="scss">
  .toolbar {
    height: 32px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;

    .finder {
      height: 32px;

      input {
        width: 120px;
        height: 30px;
        padding: 0 20px;
        border: 1px solid var(--gray-200);
        border-radius: 4px;
        &:focus {
          border-color: transparent;
          outline: 3px solid var(--primary-900);
        }
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-radius: 5px;
    border: 1px solid var(--gray-200);
    thead {
      tr {
        margin: 0;
        padding: 0;
        th {
          height: 38px;
          font-size: 14px;
          font-weight: bold;
          color: var(--gray-400);
          padding: 0 8px;
          background-color: var(--gray-50);
        }
      }
    }
    tbody {
      tr {
        &:nth-child(even) {
          background-color: var(--gray-50);
        }
        td {
          height: 38px;
          font-size: 14px;
          padding: 0 8px;
          &.buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            :global(button) {
              margin-right: 10px;
              &:last-child {
                margin: 0;
              }
            }
          }
        }
      }
    }
  }
</style>