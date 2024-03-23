<script lang="ts">
	import { onMount } from "svelte";
	import { notBlank } from "$lib/broswer.js";

	import Logo from "$component/Logo.svelte";
	import Errors from "$component/Errors.svelte";
	import Captcha from "$component/Captcha.svelte";

  export let data;
  export let form;

  $: locals = data.locals

  const shadow = {
    fullname: '',
    password: '',
    captcha: ''
  }
  const verification = async (event: SubmitEvent)=> {
    notBlank(event, shadow, {
      fullname: '账号',
      password: '密码',
      captcha: '验证码'
    })
  }
</script>

<svelte:head>
  <title>账号注册|{locals.title}</title>
</svelte:head>

<div class="wrapper">
    <form on:submit={ verification } method="POST">
      <div class="hd">
        <Logo small round/>
      </div>
      <div class="md">
        <input bind:value={ shadow.fullname} name="fullname" type="text" placeholder="账号" autocomplete="off"/>
        <input bind:value={ shadow.password} name="password" type="password" placeholder="密码"/>
      </div>
      <div class="rp"></div>
      <div class="pt">
        <input bind:value={ shadow.captcha} name="captcha" type="text" maxlength="4" placeholder="验证码"/>
        <Captcha/>
      </div>
      {#if Array.isArray(form?.errors) }
        <Errors errors={ form.errors }/>
      {/if}
      <div class="ft">
        <button type="submit">注册</button>
      </div>
      {#if data.locals.control.login_enable}
        <div class="at">
          <span>已有账号,请</span>
          <a href="/login">登录</a>
        </div>
      {/if}
    </form>
</div>

<style lang="scss">
  @import '../login/module.scss';
</style>