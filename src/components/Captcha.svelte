<script lang="ts">
  export let lazy = false;

  let svgHtml = '';
  const fetchCaptcha = async ()=> {
    svgHtml = await (await fetch('/api/captcha')).text()
  }

  if(false === lazy) {
    fetchCaptcha()
  }
</script>

<button on:click={ fetchCaptcha } type="button" title="点击刷新验证码">
  {@html svgHtml}
</button>

<style lang="scss">
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
</style>