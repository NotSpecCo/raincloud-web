<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Tokens } from '$lib/schemas';
	import { Storage } from '$lib/storage';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	let qrCodeDateUrl: string | null = null;

	onMount(async () => {
		const tokens = Storage.get('tokens');
		if (!tokens) {
			console.error('No tokens found in session storage');
			goto('/');
			return;
		}

		qrCodeDateUrl = await createQRCode(tokens);

		if (!qrCodeDateUrl) {
			// TODO: Handle error
		}
	});

	async function createQRCode(tokens: Tokens): Promise<string> {
		const dataUrl = await QRCode.toDataURL(JSON.stringify(tokens), {
			errorCorrectionLevel: 'M'
		}).catch((err) => {
			// TODO: Handle error
			return '';
		});

		return dataUrl;
	}
</script>

<div class="root">
	{#if qrCodeDateUrl}
		<img class="qr" src={qrCodeDateUrl} alt="" />
		<div class="message">Scan this QR code with the RainCloud app to log in.</div>
	{/if}
</div>

<style>
	.root {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100vh;
	}

	.message {
		max-width: 244px;
		text-align: center;
	}
</style>
