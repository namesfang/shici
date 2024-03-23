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

<div class="login-wrapper">
    <form on:submit={ verification } method="POST">
      <div class="hd">
        <Logo small round/>
      </div>
      <div class="md">
        <input bind:value={ shadow.fullname} name="fullname" type="text" placeholder="账号" autocomplete="off"/>
        <input bind:value={ shadow.password} name="password" type="password" placeholder="密码"/>
      </div>
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
  .login-wrapper {
    height: var(--height-wrapper);
    display: flex;
    align-items: center;
    justify-content: center;

    form {
      width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32px 24px;
      background-color: var(--gray-50);
      border: 1px solid var(--gray-100);
      border-radius: 10px;

      input {
        width: 100%;
        height: 46px;
        padding: 0 20px 0 40px;
        box-sizing: border-box;
        position: relative;
        z-index: 0;
        
        &:first-child {
          border-radius: 10px 10px 0 0;
          border: 1px solid var(--gray-300);
        }
        &:last-child {
          border-radius: 0 0 10px 10px;
          border: 1px solid var(--gray-300);
          border-top: 0;
        }
        &:focus {
          border-color: transparent;
          outline: 3px solid var(--primary-900);
          z-index: 1;
        }
      }
      
      .hd {
        height: 72px;
      }
      .md {
        margin: 40px 0;
      }

      .pt {
        margin-bottom: 40px;
        display: flex;
        input {
          width: 150px;
          border-radius: 10px;
        }
      }

      .ft {
        width: 100%;
        height: 46px;
        button {
          height: 46px;
          font-size: 14px;
          color: #fff;
          border-radius: 10px;
          border: 0;
          width: 100%;
          background-color: var(--primary-900);
          position: relative;
          &:active {
            &::after {
              content: "";
              background-color: rgba(0,0,0,.2);
              position: absolute;
              inset: 0;
              border-radius: 10px;
            }
          }
        }
      }
      
      .at {
        line-height: 60px;
        font-size: 14px;
        a {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>