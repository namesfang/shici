<script lang="ts">
	import { onMount } from "svelte";

  let svgHtml = '';
  const fetchCaptcha = async ()=> {
    svgHtml = await (await fetch('/api/captcha')).text()
  }

  onMount(()=> {
    fetchCaptcha()
  })
</script>

<button on:click={ fetchCaptcha } type="button" title="点击刷新验证码">
  {@html svgHtml ? svgHtml : '正在加载...'}
</button>

<style lang="scss">
  button {
    width: 150px;
    line-height: 46px;
    text-align: center;
    font-size: 14px;
    color: var(--gray-400);
    border-radius: 10px;
    border: 0;
    background-color: var(--gray-100);
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>