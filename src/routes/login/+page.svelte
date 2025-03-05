<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SC_CLIENT_ID, PUBLIC_SC_REDIRECT_URI } from '$env/static/public';
	import { Storage } from '$lib/storage';
	import { calculatePKCECodeChallenge, randomPKCECodeVerifier, randomState } from 'openid-client';
	import { onMount } from 'svelte';

	onMount(() => {
		login();
	});

	async function login() {
		const url = new URL('https://secure.soundcloud.com/authorize');
		url.searchParams.append('response_type', 'code');
		url.searchParams.append('client_id', PUBLIC_SC_CLIENT_ID);
		url.searchParams.append('redirect_uri', PUBLIC_SC_REDIRECT_URI);

		const codeVerifier = randomPKCECodeVerifier();
		Storage.set('code_verifier', codeVerifier);
		const codeChalenge = await calculatePKCECodeChallenge(codeVerifier);
		url.searchParams.append('code_challenge', codeChalenge);
		url.searchParams.append('code_challenge_method', 'S256');

		const state = randomState();
		url.searchParams.append('state', state);

		console.log('url', url.toString());

		window.location.href = url.toString();
	}

	function logout() {
		Storage.clear();
		goto('/');
	}
</script>

<div></div>
