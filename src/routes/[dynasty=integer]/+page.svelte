<script lang="ts">
  import Pagination from "$component/Pagination.svelte";

  import { page } from '$app/stores'
	import SearchToolbar from '$component/SearchToolbar.svelte';
	import PoetryResults from '$component/PoetryResults.svelte';
  //
  export let data;

  let keyword = $page.url.searchParams.get('keyword') ?? ''

  $: title = `${data.dynasty.name}诗词`

  $: pageCurrent = Number(data.page ?? 1)
  $: posts = data.posts
  $: count = data.count

</script>
<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {keyword}>
  {title} (<a href="/author?dynasty={data.dynasty.id}">{data.authorCount}名诗人</a>)
</SearchToolbar>

<PoetryResults {posts} {keyword}/>

<Pagination {pageCurrent} {count} take={80}/>