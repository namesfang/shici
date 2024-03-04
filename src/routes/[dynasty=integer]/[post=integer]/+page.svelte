<script lang="ts">
	import type { Author, Content, Dynasty } from '@prisma/client';

  export let data;

  let contents: Content[] = []
  let author: Author | null;
  let dynasty: Dynasty | null;

  $: contents = data.detail?.contents ?? []
  $: author = data.detail?.author
  $: dynasty = data.detail?.dynasty

  const addFavrite = ()=> {
    alert(data.detail.title)
  }
</script>

<svelte:head>
  <title>{data.detail.title}|{data.locals.title}</title>
</svelte:head>

<article>
  <h1>{data.detail.title}</h1>
  <section>
    <p>作者：<a href="/author/{author?.id}">{author?.fullname}</a></p>
    <p>朝代：{dynasty?.name}</p>
  </section>
  <section>
    <button type="button" on:click={ addFavrite }>收藏</button>
  </section>
  <section >
    {#each contents as { content }}
      <p>{content}</p>
    {/each}
  </section>
</article>