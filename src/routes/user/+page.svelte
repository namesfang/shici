<script lang="ts">
  import { page } from "$app/stores";
  const links = [
    {
      label: '我的',
      href: '/user'
    },
    {
      label: '退出',
      href: '/user/logout'
    }
  ]
</script>

<div class="wrapper">
  <div class="west">
    <ul>
      {#each links as {label, href} }
        <li>
          <a class:active={href == $page.url.pathname} {href}>{label}</a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="main"></div>
</div>

<style lang="scss">
  .wrapper {
    min-height: var(--height-wrapper);
    display: flex;
    padding: 24px;
    box-sizing: border-box;
  }

  .west {
    width: 180px;
    background-color: var(--primary-900);
    border-radius: 10px;
    ul {
      margin: 24px 0;
      li {
        a {
          line-height: 36px;
          padding: 0 24px;
          display: block;
        }

        .active {
          color: var(--primary-900);
          background-color: var(--white);
        }
      }
    }
  }
</style>