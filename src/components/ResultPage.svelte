<script lang="ts">
	import { browser } from "$app/environment";
	import Action from "$component/Action.svelte";

  // 操作成功 登录成功
  export let desc: string;
  export let pageName = '首页'
  export let redirect = '/'

  let seconds = 3

  if(browser) {
    const timer = setInterval(async ()=> {
      if(seconds == 0) {
        clearInterval(timer)
        location.replace(redirect)
        return
      }
      seconds --
    }, 1000)
  }

  const redirectUrl = ()=> {
    location.replace(redirect)
  }
</script>

<div class="wrapper">
  <p>{desc}, {seconds}s 跳转到{pageName}</p>
  <p>
    <Action on:click={ redirectUrl } primary label="立即跳转"/>
  </p>
</div>

<style lang="scss">
  .wrapper {
    min-height: var(--height-wrapper);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      +p {
        margin-top: 30px;
      }
    }
  }
</style>