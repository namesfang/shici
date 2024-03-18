<script lang="ts">
  import Empty from '$component/Empty.svelte';
  import Pagination from "$component/Pagination.svelte";

  import { page } from '$app/stores'
	import SearchToolbar from '$component/SearchToolbar.svelte';
	import PoetryResults from '$component/PoetryResults.svelte';
  //
  export let data;

  let keyword = $page.url.searchParams.get('keyword') ?? ''

  $: title = `${data.dynasty.name}诗词列表`

  $: pageCurrent = Number(data.page ?? 1)
  $: posts = data.posts
  $: count = data.count

</script>
<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {title} {keyword}/>

<PoetryResults {posts} {keyword}/>

<Pagination {pageCurrent} {count} take={80}/>