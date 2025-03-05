<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SC_CLIENT_ID, PUBLIC_SC_REDIRECT_URI } from '$env/static/public';
	import type { Tokens } from '$lib/schemas';
	import { Storage } from '$lib/storage';
	import { onMount } from 'svelte';

	onMount(async () => {
		const code = new URL(location.href).searchParams.get('code');
		const codeVerifier = Storage.get('code_verifier');

		if (!code || !codeVerifier) {
			console.error('code or codeVerifier not found');
			goto('/');
			return;
		}

		const tokens = await getTokens(code, codeVerifier);
		console.log('tokens', tokens);
		Storage.clear();
		Storage.set('tokens', tokens);

		goto('/');
	});

	async function getTokens(code: string, codeVerifier: string): Promise<Tokens> {
		const res: Tokens = await fetch('/api/v1/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code,
				codeVerifier,
				clientId: PUBLIC_SC_CLIENT_ID,
				redirectUri: PUBLIC_SC_REDIRECT_URI
			})
		}).then((response) => response.json());

		return res;
	}
</script>

<div>Fetching tokens...</div>
