<script lang="ts">
  import { page } from '$app/stores';
  import { browser, building } from '$app/environment';
  import { debounce } from 'throttle-debounce'

	import Icon from '$component/Icon.svelte';
	import Logo from '$component/Logo.svelte';

  export let data;

  let now = (new Date).getFullYear()
  let className: string = ''
  let dynasty: number;
  
  $: {
    dynasty = Number($page.params.dynasty ?? 0)
  }

  const scrolling = debounce(200, ()=> {
    className =  document.documentElement.scrollTop > 30 ? 'header-stick' : ''
  })

  if(browser) {
    window.addEventListener('scroll', scrolling)
  }
</script>

<svelte:head>
  <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?ae4dc02033780c1e6c33e9963af4bcda";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  </script>
</svelte:head>

<header class={className}>
  <div class="placeholder"></div>
  <div class="inner">
    <div class="west">
      <a href="/">
        <Logo size={32}/>
        <em>{data.locals.title }</em>
      </a>
    </div>
    <div class="east">
      <ul>
        {#each data.links as { id, name }}
          {@const href = `/${id > 0 ? id : ''}` }
          <li class:active={$page.url.pathname === href}>
            <a {href}>{name}</a>
          </li>
        {/each}
      </ul>
      {#if null === data.locals.user}
        {#if data.locals.control.login_enable}
          <a href="/login" class="avatar">
            <Logo small className="offline"/>
          </a>
        {/if}
      {:else}
        <a href="/user" class="avatar">
          <Logo small />
        </a>
      {/if}
    </div>
  </div>
</header>

<main>
  <slot/>
</main>

<footer>
  <p>
    <span>{data.locals.title}&copy;{now}</span>
    <a class="underline" rel="nofollow" href="https://beian.miit.gov.cn/">皖ICP备19011029号-12</a>
  </p>
  <p>中华诗词收录了上至先秦下至当代，共计{data.postCount}首诗词，{data.authorCount}位诗人；完全免费并开放所有诗词内容和程序源代码，您可自由复制、修改、传播诗词内容和程序源码。<a class="underline" rel="nofollow" href="https://github.com/michaelliao/shici/">数据来源</a></p>
  <p>本站使用 SvelteKit 构建，获取源代码</p>
  <p>
    <a rel="nofollow" href="https://github.com/namesfang/shici">
      <Icon type="github-fill" medium/>
    </a>
  </p>
</footer>

<style lang="scss" scoped>
  .header-stick {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: .5s all;
    z-index: 1;
    .placeholder {
      display: block;
    }
  }

  header {
    height: 64px;
    background-color: var(--white);
    box-shadow: 0 0 20px var(--gray-300);
    position: relative;
    &::after {
      content: "";
      border-bottom: 1px solid var(--gray-200);
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      transform: scaleY(.5);
    }

    .placeholder {
      display: none;
    }

    .inner {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      
      .west {
        width: 180px;
        a {
          height: 64px;
          display: flex;
          align-items: center;
          color: var(--primary-900);
          font: {
            size: 26px;
            weight: bold;
          };
          em {
            margin-left: 10px;
          }
        }
      }
      
      .east {
        display: flex;
        align-items: center;
        ul {
          flex: 1;
          display: flex;
          align-items: center;
          li {
            display: flex;
            a {
              height: 64px;
              font-size: 16px;
              padding: 0 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .active {
            a {
              color: var(--white);
              background-color: var(--primary-900);
            }
          }
        }

        .avatar {
          width: 32px;
          height: 32px;
          margin-left: 20px;
          :global(img) {
            width: 100%;
            display: block;
            border-radius: 50%;
          }
          :global(.offline) {
            filter: grayscale(1);
            opacity: 0.5;
          }
        }
      }
    }

  }

  footer {
    height: auto;
    overflow: hidden;
    padding: 50px 0;
    background-color: var(--gray-100);
    p {
      height: 32px;
      font-size: 14px;
      color: var(--gray-500);
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        margin-left: 5px;
        color: var(--gray-500);
        &[class^="underline"]:hover {
          text-decoration: underline;
        }
      }

      &:last-child {
        height: 48px;
      }
    }
  }
</style>