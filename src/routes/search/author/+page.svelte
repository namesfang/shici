<script lang="ts">
  import AuthorResults from '$component/AuthorResults.svelte';
  import Pagination from "$component/Pagination.svelte";
	import SearchToolbar from '$component/SearchToolbar.svelte';
	import Tabs from '$component/search/Tabs.svelte';

  export let data;

  const items = data.locals.dict.search_type

  $: keyword = data.keyword ?? ''
  $: title = keyword ? `“${keyword}”诗词作者搜索结果` : ''

  $: count = data.count
  $: pageCurrent = data.page
  $: authors = data.list
</script>

<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {title} {keyword}/>

<Tabs type="author" {keyword} {items}/>

<AuthorResults {authors} {keyword}/>

<Pagination {pageCurrent} {count}/>
