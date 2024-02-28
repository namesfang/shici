<script lang="ts">
  export let data;
</script>

<header>
  <div class="brand">
    <a href="/">中华诗词</a>
  </div>
  <ul>
    {#each data.list as { id, name }}
    <li>
      <a href="/dynasty/{name}">{name}</a>
    </li>
    {/each}
  </ul>
  <nav>
    <a href="/login">登录</a>
    <a href="/signup">注册</a>
  </nav>
</header>

<main>
  <slot/>
</main>

<footer>
  <p>&copy; 版权所有</p>
</footer>