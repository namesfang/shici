<script lang="ts">
	import Captcha from "$component/Captcha.svelte";
  import Errors from "$component/Errors.svelte";
	import Logo from "$component/Logo.svelte";

	import { notBlank } from "$lib/broswer.js";


  export let data;
  export let form;

  $: locals = data.locals

  const shadow = {
    fullname: '',
    password: '',
    captcha: ''
  }

  const verification = (event: SubmitEvent)=> {
    notBlank(event, shadow, {
      fullname: '账号',
      password: '密码',
      captcha: '验证码'
    })
  }

</script>

<svelte:head>
  <title>账号登录|{locals.title}</title>
</svelte:head>

<div class="wrapper">
    <form on:submit={ verification } method="POST">
      <div class="hd">
        <Logo small round/>
      </div>
      <div class="md">
        <!-- svelte-ignore a11y-autofocus -->
        <input bind:value={ shadow.fullname } name="fullname" autofocus type="text" placeholder="账号" autocomplete="off"/>
        <input bind:value={ shadow.password } name="password" type="password" placeholder="密码"/>
      </div>
      <div class="rp">
        <a href={data.enabled ? '/reset-password' : '/website-administrator'}>忘记密码?</a>
      </div>
      <div class="pt">
        <input bind:value={ shadow.captcha } name="captcha" type="text" maxlength="4" placeholder="验证码"/>
        <Captcha/>
      </div>
      {#if Array.isArray(form?.errors) }
        <Errors errors={ form.errors}/>
      {/if}
      <div class="ft">
        <button type="submit">登录</button>
      </div>
      {#if data.locals.control.signup_enable}
        <div class="at">
          <span>还没有账号,请</span>
          <a href="/signup">注册</a>
        </div>
      {/if}
    </form>
</div>

<style lang="scss">
  @import './module.scss'
</style>