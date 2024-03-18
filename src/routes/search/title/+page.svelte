<script lang="ts">
	import { page } from "$app/stores";
  import Pagination from "$component/Pagination.svelte";
	import PoetryResults from '$component/PoetryResults.svelte';
	import SearchToolbar from '$component/SearchToolbar.svelte';
	import Tabs from '$component/search/Tabs.svelte';

  //
  export let data;

  const items = data.locals.dict.search_type

  $: posts = data.posts
  $: keyword = data.keyword ?? ''
  $: title = keyword ? `“${keyword}”标题搜索结果` : ''
  $: pageCurrent = data.page
  $: count = data.count
</script>


<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {title} {keyword}/>

<Tabs type="title" {keyword} {items}/>

<PoetryResults {keyword} {posts} withTabs={true}/>
  
<Pagination {pageCurrent} {count} take={80}/>
