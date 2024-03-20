<script lang="ts">
  import { page } from "$app/stores";

  export let data;

  const links = [
    [
      {
        label: '首页',
        href: '/user'
      },
      {
        label: '收藏夹',
        href: '/user/favorites'
      },
      {
        label: '纠错记录',
        href: '/user/correction'
      },
    ],
  ]

  if(data.locals.user?.adm) {
    links.push([
      {
        label: '诗词管理',
        href: '/user/posts'
      },
    ])
  }

  let mainTitle = '首页'

  $: {
    for(let i in links) {
      const item = links[i].find(({href})=> $page.url.pathname === href)
      if(item) {
        mainTitle = item.label
        break
      }
    }
  }

</script>

<div class="wrapper">
  <div class="west">
    {#each links as items }
      <ul>
        {#each items as {label, href} }
          <li>
            <a class:active={href == $page.url.pathname} {href}>{label}</a>
          </li>
        {/each}
      </ul>
    {/each}
    <ul>
      <li>
        <a href="/user/logout">退出</a>
      </li>
    </ul>
  </div>
  <div class="main">
    <h1>{ mainTitle }</h1>
    <slot/>
  </div>
</div>

<style lang="scss">
  .wrapper {
    width: 1200px;
    margin: 0 auto;
    min-height: var(--height-wrapper);
    display: flex;
    padding: 24px;
    box-sizing: border-box;
  }

  .west {
    width: 200px;
    padding-right: 30px;
    border-right: 1px solid var(--gray-100);

    ul {
      padding: 10px 0;
      border-top: 1px solid var(--gray-200);

      &:first-child {
        padding: 0;
        border-top: 0;
      }

      li {
        a {
          line-height: 36px;
          font-size: 14px;
          color: var(--gray900);
          padding: 0 24px;
          border-radius: 5px;
          display: block;
          &:hover {
            color: var(--primary-900);
          }
        }

        .active {
          color: var(--white);
          font-weight: bold;
          background-color: var(--primary-900);
          &:hover {
            color: var(--white);
          }
        }
      }
    }
  }

  .main {
    flex: 1;
    padding: 0 30px;
    h1 {
      height: 36px;
      line-height: 36px;
      font-size: 18px;
      font-weight: bold;
      color: var(--gray-600);
    }
  }
</style>