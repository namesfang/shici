<script lang="ts">
	import Action from "$component/Action.svelte";
	import Dialog from "$component/Dialog.svelte";
	import Pagination from "$component/Pagination.svelte";

	import { toast } from "$lib/broswer";

  import type { User } from '@prisma/client'

  export let data;

  let keyword = data.keyword
  
  let currentIndex = -1

  let current = {} as User

  $: list = data.list;
  $: count = data.count;

  $: {
    if(currentIndex > -1) {
      current = list[currentIndex]
    }
  }

  $: fullname = current.fullname ?? ''

  
  let resetVisible = false
  const openResetDialog = (index: number)=> {
    currentIndex = index
    resetVisible = true
  }

  const resetIt = async (close: ()=> void)=> {
    const result = await fetch('/api/adm/user/reset', {
      method: 'POST',
      body: JSON.stringify({
        id: current.id
      })
    })

    const { code, msg } = await result.json()

    if(code == 0) {
      close()
      location.reload()
    }
    toast(msg, code > 0)
  }
  
  let visible = false
  const openDeleteDialog = async (index: number)=> {
    visible = true;
    currentIndex = index
  }

  const deleteIt = async (close: ()=> void)=> {
    const result = await fetch('/api/adm/user/toggle', {
      method: 'POST',
      body: JSON.stringify({
        id: current.id
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
  <div class="buttons">
    <Action href="/user/users/create" primary icon="plus">新增</Action>
  </div>
  <form action="/user/users" class="finder">
    <input type="text" name="keyword" placeholder="账号" bind:value={keyword}/>
    <Action type="submit" primary>搜索</Action>
  </form>
</div>

<table>
  <colgroup>
    <col width="50">
    <col width="auto">
    <col width="80">
    <col width="140">
    <col width="200">
  </colgroup>
  <thead>
    <tr>
      <th>#</th>
      <th align="left">账号</th>
      <th align="center">管理员</th>
      <th>注册时间</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    {#each list as t, index }
      <tr>
        <td align="right">{ index + 1 }</td>
        <td align="left">{ t.fullname }</td>
        <td align="center">{ t.adm ? '✅' : '' }</td>
        <td align="center">{ t.createdAt.toLocaleString() }</td>
        <td align="center" class="buttons">
          {#if count > 1}
            {#if t.frozen}
              <Action on:click={ ()=> openDeleteDialog(index) } small success>启用</Action>
            {:else}
              <Action on:click={ ()=> openDeleteDialog(index) } small primary>停用</Action>
            {/if}
          {/if}
          <Action href={`/user/users/edit?id=${t.id}`} small warning>编辑</Action>
          <Action on:click={ ()=> openResetDialog(index) } small>重置密码</Action>
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

<Dialog confirmAction={ deleteIt } bind:visible={visible} content={`确定${current.frozen ? '启用' : '停用'}“${fullname}”账号？`}></Dialog>
<Dialog confirmAction={ resetIt } bind:visible={resetVisible} content={`确定重置账号“${fullname}”密码？`}></Dialog>

<Pagination {count} />

<style lang="scss">
  @import '../module.scss'
</style>