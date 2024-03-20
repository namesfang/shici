<script lang="ts">
	import { browser } from "$app/environment";

  let seconds = 3

  if(browser) {
    const timer = setInterval(async ()=> {
      if(seconds == 0) {
        clearInterval(timer)
        location.replace('/')
      }
      seconds --
    }, 1000)
  }
</script>

<div class="wrapper">
  <p>已退出系统, {seconds}s 跳转到首页</p>
</div>

<style lang="scss">
  .wrapper {
    min-height: var(--height-wrapper);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>