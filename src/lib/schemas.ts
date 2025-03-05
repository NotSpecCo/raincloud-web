import { z } from 'zod';

export const scTokenRequestSchema = z.object({
	clientId: z.string(),
	clientSecret: z.string(),
	codeVerifier: z.string(),
	redirectUri: z.string(),
	code: z.string()
});
export type SCTokenRequest = z.infer<typeof scTokenRequestSchema>;

export const scRefreshTokenRequestSchema = z.object({
	clientId: z.string(),
	clientSecret: z.string(),
	refreshToken: z.string()
});
export type SCRefreshTokenRequest = z.infer<typeof scRefreshTokenRequestSchema>;

export const scTokenResponseSchema = z.object({
	access_token: z.string(),
	token_type: z.string(),
	expires_in: z.number(),
	refresh_token: z.string(),
	scope: z.string()
});
export type SCTokenResponse = z.infer<typeof scTokenResponseSchema>;

export const tokenRequestSchema = z.object({
	clientId: z.string(),
	code: z.string(),
	codeVerifier: z.string(),
	redirectUri: z.string()
});

export type TokenRequest = z.infer<typeof tokenRequestSchema>;

export const refreshTokenRequestSchema = z.object({
	clientId: z.string(),
	refreshToken: z.string()
});
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;

export const tokensSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
	tokenType: z.string(),
	expiresIn: z.number(),
	expiresAt: z.number()
});

export type Tokens = z.infer<typeof tokensSchema>;
