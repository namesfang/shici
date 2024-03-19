<script lang="ts">
	import AuthorResults from '$component/AuthorResults.svelte';
  import Empty from '$component/Empty.svelte';
  import Pagination from "$component/Pagination.svelte";
	import SearchToolbar from '$component/SearchToolbar.svelte';

  export let data;

  $: keyword = data.keyword ?? ''
  $: title = keyword ? `搜索“${keyword}”作者` : `${data.dynasty?.name}作者`

  $: count = data.count
  $: pageCurrent = data.page

  $: authors = data.list
</script>

<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {title} {keyword} placeholder="搜索诗人名称"/>

<AuthorResults {authors} {keyword} />
  
<Pagination {pageCurrent} {count}/>