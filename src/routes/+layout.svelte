<script lang="ts">
  import { page } from '$app/stores';
  export let data;

  let dynasty: number;
  
  $: {
    dynasty = Number($page.params.dynasty ? $page.params.dynasty : 0)
  }

</script>

<header>
  <div class="inner">
    <div class="west">
      <a href="/">中华诗词</a>
    </div>
    <div class="east">
      <ul>
        {#each data.list as { id, name }}
        {#if dynasty === id}
          <li class="active">
            <a href="/{id > 0 ? id : ''}">{name}</a>
          </li>
        {:else}
          <li>
            <a href="/{id > 0 ? id : ''}">{name}</a>
          </li>
          {/if}
        {/each}
      </ul>
      {#if data.list.length == 0}
        <a href="/login" class="avatar">
          <img src="/images/logo-72.jpg" alt="avatar" class="offline"/>
        </a>
      {:else}
        <a href="/user/favorites" class="avatar">
          <img src="/images/logo-72.jpg" alt="avatar"/>
        </a>
      {/if}
    </div>
  </div>
</header>

<main>
  <slot/>
</main>

<footer>
  <p>&copy; 版权所有 皖ICP备</p>
</footer>

<style lang="scss">
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
          padding-left: 40px;
          color: var(--primary-500);
          font: {
            size: 26px;
            weight: bold;
          };
          background: {
            image: url(/images/logo-32.jpg);
            position: left center;
            repeat: no-repeat;
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
              background-color: var(--primary-500);
            }
          }
        }

        .avatar {
          width: 32px;
          height: 32px;
          margin-left: 20px;
          img {
            width: 100%;
            display: block;
            border-radius: 50%;
          }
          .offline {
            filter: grayscale(1);
            opacity: 0.5;
          }
        }
      }
    }

  }

  main {
    width: 1200px;
    margin: 0 auto;
  }

  footer {
    height: 200px;
    background-color: var(--gray-200);
  }
</style>