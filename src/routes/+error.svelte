<script lang="ts">
  import { browser } from '$app/environment'
	import { goto } from '$app/navigation';
  import { page } from "$app/stores";

  type Err = {
    [key: number]: string
  }
  const status = $page.status
  const errors: Err = {
    400: '参数不完整',
    404: '页面未找到'
  }

  $: message = errors[status] ?? '系统错误'

  let seconds = 2;

  if(browser) {
    setInterval(async ()=> {
      seconds --
      if(seconds < 0) {
        await goto('/')
      }
    }, 1000)
  }
</script>

<div class="wrapper">
  <div class="error">
    <div class="message">
      <h2>{message}</h2>
      <p>{$page.error?.message}</p>
    </div>
    <p>系统在{seconds}秒后自动跳转到首页</p>
    <div class="back">
      <button on:click={ ()=> history.back() } type="button">返回</button>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    height: calc(100vh - var(--height-header) - var(--height-footer));
    display: flex;
    align-items: center;
    justify-content: center;
    .error {
      &>p {
        line-height: 60px;
        font-size: 14px;
        text-align: center;
        color: var(--gray-400);
      }
      .back {
        display: flex;
        justify-content: center;
        button {
          width: 80px;
          height: 32px;
          color: var(--primary-900);
          border: 0;
          border-radius: 4px;
          background-color: var(--gray-200);
        }
      }
      
      .message {
        width: 480px;
        border-radius: 10px;
        outline-offset: 3px;
        outline: 3px dashed var(--primary-500);
        background-color: var(--primary-100);
        text-align: center;
        h2 {
          line-height: 30px;
          font-size: 14px;
          color: var(--white);
          padding: 12px;
          border-radius: 10px 10px 0 0;
          background-color: var(--primary-500);
        }

        p {
          line-height: 60px;
          font-size: 14px;
          color: var(--gray-900);
        }
      }

    }
  }
</style>