<script lang="ts">
	import Action from "$component/Action.svelte";
	import Errors from "$component/Errors.svelte";
  import Switch from "$component/Switch.svelte";
	import { notBlank } from "$lib/broswer";

  export let form;

  const shadow = {
    fullname: '',
    password: '',
    adm: false
  }

  const verification = async (event: SubmitEvent)=> {
    notBlank(event, shadow, {
      fullname: '账号',
      password: '密码',
    })
  }
</script>

<div class="form-warpper">
  {#if Array.isArray(form?.errors) }
    <Errors errors={ form.errors}/>
  {/if}
  <form on:submit={ verification } method="post">
    <ul>
      <li>
        <span>账号：</span>
        <input bind:value={ shadow.fullname } name="fullname" type="text" placeholder="2~20个字"/>
      </li>
      <li>
        <span>密码：</span>
        <input bind:value={ shadow.password } name="password" type="password" placeholder=""/>
      </li>
      <li>
        <Switch bind:value={ shadow.adm } active="管理员" name="adm" />
      </li>
    </ul>
    <Action primary type="submit">创建账号</Action>
  </form>
</div>

<style lang="scss">
  .form-warpper {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;



    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 320px;
      ul {
        width: 100%;
        margin-bottom: 20px;
        li {
          margin-bottom: 20px;
          display: flex;

          &:last-child {
            margin-left: 50px;
          }

          span {
            width: 50px;
            line-height: 32px;
            font-size: 14px;
          }

          input {
            flex: 1;
            height: 24px;
            padding: 6px 12px;
            border-radius: 4px;
            border: 1px solid var(--gray-200);

            &:focus {
              border-color: transparent;
              outline: 3px solid var(--primary-900);
            }
          }
        }
      }
    }
  }
</style>