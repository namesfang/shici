<script lang="ts">
	import Logo from "$component/Logo.svelte";
	import { notBlank } from "$lib/broswer.js";

	import { onMount } from "svelte";

  export let data;
  export let form;

  $: locals = data.locals

  const shadow = {
    fullname: '',
    password: '',
    captcha: ''
  }

  // 获取验证码接口
  let svgHtml = '';
  const fetchCaptcha = async ()=> {
    svgHtml = await (await fetch('/api/captcha')).text()
  }

  const verification = (event: SubmitEvent)=> {
    notBlank(event, shadow, {
      fullname: '账号',
      password: '密码',
      captcha: '验证码'
    })
  }

  onMount(()=> {
    fetchCaptcha()
  })
</script>

<svelte:head>
  <title>账号登录|{locals.title}</title>
</svelte:head>

<div class="login-wrapper">
    <form on:submit={ verification } method="POST">
      <div class="hd">
        <Logo small/>
      </div>
      <div class="md">
        <!-- svelte-ignore a11y-autofocus -->
        <input bind:value={ shadow.fullname } name="fullname" autofocus type="text" placeholder="账号" autocomplete="off"/>
        <input bind:value={ shadow.password } name="password" type="password" placeholder="密码"/>
      </div>
      <div class="rp">
        <a href="/reset-password">忘记密码?</a>
      </div>
      <div class="pt">
        <input bind:value={ shadow.captcha } name="captcha" type="text" maxlength="4" placeholder="验证码"/>
        <button on:click={ fetchCaptcha } type="button" title="点击刷新验证码">
          {@html svgHtml}
        </button>
      </div>
      {#if Array.isArray(form?.errors) }
        <ul class="errors">
          {#each form.errors as error}
          <li>{error}</li>
          {/each}
        </ul>
      {/if}
      <div class="ft">
        <button type="submit">登录</button>
      </div>
      <div class="at">
        <span>还没有账号,请</span>
        <a href="/signup">注册</a>
      </div>
    </form>
</div>

<style lang="scss">
  .login-wrapper {
    height: calc(100vh - var(--height-header) - var(--height-footer));
    display: flex;
    align-items: center;
    justify-content: center;

    .errors {
      margin-bottom: 40px;
      li {
        line-height: 30px;
        text-align: left;
        color: var(--primary-900);
      }
    }

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
        margin: 40px 0 10px;
      }

      .rp {
        width: 100%;
        text-align: right;
        margin: 0 0 20px;
        a {
          font-size: 14px;
          color: var(--primary-900);
        }
      }

      .pt {
        margin-bottom: 40px;
        display: flex;
        input {
          width: 150px;
          border-radius: 10px;
        }
        button {
          width: 150px;
          border-radius: 10px;
          border: 0;
          background-color: transparent;
          margin-left: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
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