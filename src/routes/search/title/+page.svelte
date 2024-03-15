<script lang="ts">
  import Pagination from "$component/Pagination.svelte";
	import PoetryResults from '$component/PoetryResults.svelte';
	import SearchToolbar from '$component/SearchToolbar.svelte';
	import Tabs from '$component/search/Tabs.svelte';

  //
  export let data;

  const items = data.locals.dict.search_type

  let title = ''
  let keyword = ''
  let posts: any[] = []

  $: {
    posts = data.posts
    keyword = data.keyword ?? ''
    title = keyword ? `“${keyword}”标题搜索结果` : ''
  }

</script>


<svelte:head>
  <title>{title}|{data.locals.title}</title>
</svelte:head>

<SearchToolbar {title} {keyword}/>

<Tabs type="title" {items}/>

<PoetryResults {keyword} {posts}/>
  
<Pagination count={data.count} url="" take={80}/>
