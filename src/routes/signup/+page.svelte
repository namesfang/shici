<script lang="ts">
	import Logo from "$component/Logo.svelte";

	import { onMount } from "svelte";

  export let data;
  export let form;

  $: locals = data.locals

  // 获取验证码接口
  let svgHtml = '';
  const fetchCaptcha = async ()=> {
    svgHtml = await (await fetch('/api/captcha')).text()
  }

  onMount(()=> {
    fetchCaptcha()
  })
</script>

<svelte:head>
  <title>账号注册|{locals.title}</title>
</svelte:head>

<div class="login-wrapper">
    <form method="post">
      <div class="hd">
        <Logo small/>
      </div>
      <div class="md">
        <input name="fullname" type="text" placeholder="账号" autocomplete="off"/>
        <input name="password" type="password" placeholder="密码"/>
      </div>
      <div class="pt">
        <input name="captcha" type="text" maxlength="4" placeholder="验证码"/>
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
        <button type="submit">注册</button>
      </div>
      <div class="at">
        <span>已有账号,请</span>
        <a href="/login">登录</a>
      </div>
    </form>
</div>

<style lang="scss">
  .login-wrapper {
    height: var(--height-wrapper);
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
        margin: 40px 0;
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