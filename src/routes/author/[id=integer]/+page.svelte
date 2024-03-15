<script lang="ts">
	import Pagination from '$component/Pagination.svelte';
	import PoetryResults from '$component/PoetryResults.svelte';
	import SearchToolbar from '$component/SearchToolbar.svelte';

  //
  export let data;

  let keyword = data.keyword ?? ''

  $: author = data.author

  $: title = `作者“${author.fullname}”相关诗词`
  $: toolbar = `${title}（共${data.count}首）`
</script>


<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar bind:title={toolbar} {keyword}/>

<PoetryResults bind:posts={data.posts} {keyword} />

<Pagination count={data.count} url={`/author/${author.id}`} take={80}/>
