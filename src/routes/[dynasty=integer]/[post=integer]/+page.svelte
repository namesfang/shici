<script lang="ts">
  import { toast } from '$lib/broswer'

	import Dialog from '$component/Dialog.svelte';
	import Icon from '$component/Icon.svelte';
	import Select from '$component/Select.svelte';

	import type { Author, Dynasty } from '@prisma/client';

  export let data;

  let author: Author | null;
  let dynasty: Dynasty | null;

  let visible = false
  let formVisible = false
  let svgHtml = ''

  $: author = data.detail?.author
  $: dynasty = data.detail?.dynasty

  // 获取验证码接口
  const fetchCaptcha = async ()=> {
    svgHtml = await (await fetch('/api/captcha')).text()
  }

  $: if(formVisible) {
    message = ''
    
    form.content = ''
    form.captcha = ''

    fetchCaptcha()
  }

  let starred = data.favCount > 0

  const types = data.locals.dict.correction_type

  const form = {
    type: 2,
    content: '',
    captcha: '',
    postId: data.detail.id,
  }

  let message = ''

  const addFavrite = async ()=> {

    // if(!data.locals?.user?.id) {
    //   visible = true
    //   return
    // }

    const result = await fetch('/api/favorite', {
      method: 'POST',
      body: JSON.stringify({
        postId: data.detail.id,
      })
    })

    const { msg, code, isStarred } = await result.json()

    if(0 === code) {
      close()
      starred = isStarred as boolean
    }
    toast(msg, code > 0)
  }

  const confirm = async (close: ()=> void)=> {
    message = ''
    if(form.content.length < 10 || form.content.length > 500) {
      message = '内容描述10~500个字'
      return
    }
    const result = await fetch('/api/correction', {
      method: 'POST',
      body: JSON.stringify(form)
    })

    const { msg, code } = await result.json()

    if(0 === code) {
      close()
    }
    toast(msg, code > 0)
  }
</script>

<svelte:head>
  <title>{data.detail.title}|{dynasty?.name}|{data.locals.title}</title>
</svelte:head>

<div class="wrapper">
  <article>
    <h2>{data.detail.title}</h2>
    <header>
      <span>{dynasty?.name}</span>
      <a href={`/author/${author?.id}`}>
        <em>{author?.fullname}</em>
        {#if author?.profiles}
        <p>{author?.profiles}</p>
        {/if}
      </a>
    </header>
    <section>
      {#each data.contents as contents}
        <p>
          {#each contents as {content} }{content}{/each}
        </p>
      {/each}
    </section>
    <footer>
      <button on:click={ addFavrite } class={starred ? 'starred' : ''} type="button">
        <Icon type="heart-fill" medium />
        <span>{starred ? '已收藏' : '收藏'}</span>
      </button>
      <button on:click={ ()=> formVisible = true } type="button">
        <Icon type="edit-fill" medium />
        <span>纠错信息</span>
      </button>
    </footer>
  </article>
</div>

<!--/ 收藏未登录提示 /-->
<Dialog bind:visible={visible} confirmText="立即登录" confirmAction="login" content="你未登录，请登录后再收藏此文" />

<!--/ 纠错表单弹窗 /-->
<Dialog bind:visible={formVisible} title="我要纠错" confirmText="提交" confirmAction={confirm}>
  <ul class="form">
    <li>
      <Select options={types} bind:value={form.type}/>
    </li>
    <li>
      <input type="text" bind:value={form.captcha} maxlength="4" placeholder="验证码"/>
      <button on:click={ fetchCaptcha } type="button" title="点击刷新验证码">
        {@html svgHtml}
      </button>
    </li>
    <li>
      <textarea bind:value={form.content} placeholder="内容描述10~500个字"></textarea>
      <p>{message}</p>
    </li>
  </ul>
</Dialog>

<style lang="scss" scoped>
  .wrapper {
    width: 1200px;
    min-height: calc(100vh - var(--height-header) - var(--height-footer));
    margin: 40px auto;
    display: flex;
    justify-content: center;
    align-items: center;

    article {
      h2 {
        line-height: 80px;
        text-align: center;
        font-size: 26px;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: center;

        a, span {
          font-size: 14px;
          color: var(--gray-700);
        }

        a {
          margin-left: 10px;
          position: relative;

          &:hover {
            &:has(p) {
              p {
                display: block;
              }
            }
          }

          p {
            display: none;
            min-width: 500px;
            line-height: 24px;
            color: var(--gray-700);
            font-size: 14px;
            font-style: normal;
            position: absolute;
            top: 30px;
            left: 50%;
            transform-origin: 0 0;
            transform: translateX(-50%);
            padding: 16px;
            border-radius: 6px;
            background-color: var(--white);
            box-shadow: 0 0 20px var(--gray-300);
            &::before {
              content: "";
              border: 10px solid transparent;
              border-bottom-color: var(--white);
              position: absolute;
              top: -20px;
              left: 50%;
              margin-left: -10px;
            }
          }
        }
      }

      section {
        margin-top: 30px;
        height: auto;
        overflow: hidden;
        p {
          text-align: center;
          line-height: 36px;
          font-size: 18px;
        }
      }

      footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 40px 0;

        button {
          height: 34px;
          font-size: 14px;
          color: var(--gray-500);
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          padding: 0 12px 0 0;
          cursor: pointer;
          &+button {
            margin-left: 40px;
          }

          :global(i) {
            color: var(--gray-500);
            background-color: var(--gray-200);
            border-radius: 50%;
            padding: 5px;
            margin-right: 5px;
          }

          &:hover {
            background-color: var(--gray-200);
            border-radius: 17px;

            
          }
        }

        .starred {
          :global(i) {
            color: var(--white);
            background-color: var(--primary-500);
          }
        }
      }
    }
  }

  .form {
    width: 320px;
    height: 300px;
    li {
      width: 100%;
      font-size: 0;
      margin-bottom: 20px;

      &:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          width: 130px;
        }

        button {
          width: 150px;
          height: 32px;
          border: 0;
          background-color: transparent;
          border-radius: 5px;
          cursor: pointer;
        }
      }

      p {
        line-height: 30px;
        font-size: 14px;
        color: var(--primary-700);
      }

      input {
        height: 20px;
      }

      input,
      textarea {
        padding: 5px 9px;
        border-radius: 4px;
        border: 1px solid var(--gray-300);
        &:focus {
          border-color: var(--primary-700);
          outline: 2px solid var(--primary-700);
        }
      }

      textarea {
        width: 300px;
        height: 200px;
        resize: none;
      }
    }
  }
</style>