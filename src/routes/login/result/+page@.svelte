<script lang="ts">
	import { page } from '$app/stores'

	import ResultPage from "$component/ResultPage.svelte";

	$: redirect = $page.url.searchParams.get('redirectURI') ?? '/user'

</script>

<ResultPage desc="登录成功" pageName={ redirect === '/user' ? '用户中心' : '返回上一页面'} { redirect }/>