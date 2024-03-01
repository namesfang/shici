<script lang="ts">
	import type { Author, Content, Dynasty } from '@prisma/client';

  export let data;

  let contents: Content[] = []
  let author: Author | null;
  let dynasty: Dynasty | null;

  $: contents = data.detail?.contents ?? []
  $: author = data.detail?.author
  $: dynasty = data.detail?.dynasty
</script>
<article>
  <h1>{data.detail?.title}</h1>
  <section>
    <p>作者：<a href="/诗人/{author?.fullname}">{author?.fullname}</a></p>
    <p>朝代：{dynasty?.name}</p>
  </section>
  <section >
    {#each contents as { content }}
      <p>{content}</p>
    {/each}
  </section>
</article>