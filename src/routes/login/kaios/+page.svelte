<script lang="ts">
	import { goto } from '$app/navigation';
	import { Storage } from '$lib/storage';
	import { onMount } from 'svelte';

	onMount(() => {
		Storage.set('post_login_action', 'qr_code');
		goto('/login');
	});
</script>
