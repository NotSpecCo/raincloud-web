import type { SCRefreshTokenRequest, SCTokenRequest, SCTokenResponse, Tokens } from '$lib/schemas';

export class SoundCloud {
	static async getTokens(req: SCTokenRequest): Promise<Tokens> {
		const res = await fetch('https://secure.soundcloud.com/oauth/token', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				client_id: req.clientId,
				client_secret: req.clientSecret,
				redirect_uri: req.redirectUri,
				code_verifier: req.codeVerifier,
				code: req.code
			})
		});

		if (!res.ok) {
			throw new Error(`Failed to get tokens: ${res.statusText}`);
		}

		const tokens: SCTokenResponse = await res.json();
		return {
			accessToken: tokens.access_token,
			refreshToken: tokens.refresh_token,
			tokenType: tokens.token_type,
			expiresIn: tokens.expires_in,
			expiresAt: Date.now() + tokens.expires_in * 1000
		};
	}

	static async refreshToken(req: SCRefreshTokenRequest): Promise<Tokens> {
		const res = await fetch('https://secure.soundcloud.com/oauth/token', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				client_id: req.clientId,
				client_secret: req.clientSecret,
				refresh_token: req.refreshToken
			})
		});

		if (!res.ok) {
			throw new Error(`Failed to refresh tokens: ${res.statusText}`);
		}

		const tokens: SCTokenResponse = await res.json();
		return {
			accessToken: tokens.access_token,
			refreshToken: tokens.refresh_token,
			tokenType: tokens.token_type,
			expiresIn: tokens.expires_in,
			expiresAt: Date.now() + tokens.expires_in * 1000
		};
	}
}
