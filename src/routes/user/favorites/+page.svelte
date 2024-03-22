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
  <div class="buttons"></div>
  <form action="/user/favorites" class="finder">
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
      <th>收藏时间</th>
      <th>操作</th>
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
        <td align="center" class="buttons">
          <Action on:click={ ()=> openDeleteDialog({id: fav.id, title: fav.post.title}) } small primary label="取消"/>
        </td>
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
  @import '../module.scss'
</style>