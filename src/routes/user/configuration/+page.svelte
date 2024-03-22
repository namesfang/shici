<script lang="ts">
  import { notBlank, toast } from '$lib/broswer'

	import Action from '$component/Action.svelte';
	import { afterNavigate } from '$app/navigation';
	import Switch from '$component/Switch.svelte';

  export let data;

  const shadow = {
    default_password: '',

    id: '',
    qrl: '',

    u: '',
    p: '',
    g: '',

    signup_enable: false,
    login_enable: false
  }

  type Shadow = typeof shadow
  type Name = keyof Shadow

  $: key = data.key

  afterNavigate(()=> {
    if(data.parsed) {
      const parsed: Shadow = data.parsed

      if(key === 'adm_wechat_contact') {
        shadow.id = parsed.id
        shadow.qrl = parsed.qrl
      } else if(key === 'smsbao') {
        shadow.u = parsed.u
        shadow.g = parsed.g
      } else if(key === 'account_control') {
        shadow.login_enable = parsed.login_enable
        shadow.signup_enable = parsed.signup_enable
      }
    }
  })

  const verification = async (event: SubmitEvent)=> {
    if(key === 'default_password') {
      notBlank(event, shadow, {
        default_password: '重置密码',
      })
    } else if(key === 'adm_wechat_contact') {
      notBlank(event, shadow, {
        id: '微信号',
        qrl: '微信二维码链接',
      })
    } else if(key === 'smsbao') {
      notBlank(event, shadow, {
        u: '账号',
        p: '密码',
      })
    }
  }

  const clear = async ()=> {
    const result = await fetch('/api/adm/configuration/clear', {
      method: 'POST',
      body: JSON.stringify({
        key
      })
    })

    const { code, msg } = await result.json()

    toast(msg, code > 0, (fail)=> {
      if(!fail) {
        location.reload()
      }
    })
  }
</script>

<div class="configuration">
  <div class="toolbar">
    <ul>
      {#each data.list as item }
      {@const href = `/user/configuration?key=${item.key}`}
      <li>
        <a {href} class:active={ item.key === key }>{ item.label }</a>
      </li>
      {/each}
    </ul>
  </div>
  <div class="main">
    <p>{@html data.item.desc }</p>
    <form on:submit={ verification } method="POST">
      <ul>
        <li>
          <input type="hidden" name="key" value={ key }/>
        </li>
        {#if key === 'default_password'}
          <li>
            <span>重置密码：</span>
            <input bind:value={ shadow.default_password } name="default_password" type="password" placeholder="保存后自动加密不会明文保存"/>
          </li>
        {:else if key === 'adm_wechat_contact'}
        <li>
          <span>微信号：</span>
          <input bind:value={ shadow.id } name="id" type="text" placeholder="例：namesfang"/>
        </li>
        <li>
          <span>微信二维码链接：</span>
          <input bind:value={ shadow.qrl } name="qrl" type="text" placeholder="例：https://u.wechat.com/"/>
        </li>
        {:else if key === 'smsbao'}
        <li>
          <span>账号：</span>
          <input bind:value={ shadow.u } name="u" type="text" placeholder="短信宝平台账号"/>
        </li>
        <li>
          <span>密码：</span>
          <input bind:value={ shadow.p } name="p" type="password" placeholder="短信宝平台密码 保存后自动加密不会明文保存"/>
        </li>
        <li>
          <span>专属通道：</span>
          <input bind:value={ shadow.g } name="g" type="text" placeholder="非必填"/>
        </li>
        {:else if key === 'account_control'}
        <li>
          <span>开启注册：</span>
          <Switch bind:value={ shadow.signup_enable } name="signup_enable" active="开启"/>
        </li>
        <li>
          <span>开启登录：</span>
          <Switch bind:value={ shadow.login_enable } name="login_enable" active="开启"/>
        </li>
        {/if}
      </ul>
      <div class="footer">
        <div class="item">
          <Action primary type="submit">保存</Action>
        </div>
        <div class="item">
          <Action on:click={ clear } warning>清空配置并保存</Action>
        </div>
      </div>
    </form>
  </div>
</div>

<style lang="scss">
  .configuration {
    .toolbar {
      margin: 30px 0;
      display: flex;
      ul {
        display: flex;
        li {
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }
          a {
            font-size: 14px;
            padding: 5px 15px;
            border-radius: 4px;
            background-color: var(--gray-100);
          }

          .active {
            color: var(--white);
            background-color: var(--primary-900);
          }
        }
      }
    }

    .main {
      p {
        line-height: 24px;
        font-size: 14px;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid var(--warning-300);
        background-color: var(--warning-200);

        :global(a) {
          &:hover {
            text-decoration: underline;
            text-decoration-color: var(--primary-900);
          }
        }
      }

      ul {
        margin-top: 20px;
        li {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          span {
            width: 150px;
            text-align: right;
            font-size: 14px;
          }
          input {
            flex: 1;
            font-size: 14px;
            padding: 5px 15px;
            border-radius: 5px;
            border: 1px solid var(--gray-300);
            &:focus {
              border-color: transparent;
              outline: 3px solid var(--primary-900);
            }
          }
        }
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        .item {
          margin-right: 20px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>