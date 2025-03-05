<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const url = new URL(location.href);
		if (url.pathname === '/' && url.searchParams.has('code')) {
			console.log('rerouting to /oauth');
			goto(`/oauth?${url.searchParams.toString()}`);
		}
	});
</script>

<div class="root">
	<img src="/images/icon_512.png" alt="" srcset="" class="logo" />
	<div class="name">RainCloud</div>
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.logo {
		width: 256px;
		height: 256px;
	}

	.name {
		font-size: 4rem;
		font-weight: bold;
		margin: -40px 0 40px 0;
		color: hsl(14, 77%, 54%);
	}
</style>
