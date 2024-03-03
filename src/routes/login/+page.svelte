<script lang="ts">
	import Logo from "$component/Logo.svelte";


</script>

<div class="login-wrapper">
    <form>
      <div class="hd">
        <Logo small/>
      </div>
      <div class="md">
        <input type="text" placeholder="账号" autocomplete="off"/>
        <input type="password" placeholder="密码"/>
      </div>
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
    width: 320px;
    margin: 100px auto;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .hd {
        height: 72px;
      }
      .md {
        margin: 40px 0;
        
        input {
          width: 100%;
          height: 46px;
          padding: 0 20px;
          box-sizing: border-box;
          
          &:first-child {
            border-radius: 10px 10px 0 0;
            border: 1px solid var(--gray-400);
          }
          &:last-child {
            border-radius: 0 0 10px 10px;
            border: 1px solid var(--gray-400);
            border-top: 0;
          }
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
          background-color: var(--primary-500);
        }
      }
      
      .at {
        line-height: 30px;
      }
    }
  }
</style>