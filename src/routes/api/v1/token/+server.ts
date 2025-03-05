import { tokenRequestSchema } from '$lib/schemas';
import { SoundCloud } from '$lib/server/soundcloud';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const body = await request.json().then((data) => tokenRequestSchema.safeParse(data));

	if (!body.success) {
		error(400, body.error);
	}

	const clientSecret = platform?.env.SOUNDCLOUD_CLIENT_SECRET as string;

	const tokens = await SoundCloud.getTokens({
		clientId: body.data.clientId,
		clientSecret,
		codeVerifier: body.data.codeVerifier,
		redirectUri: body.data.redirectUri,
		code: body.data.code
	});

	return json(tokens);
};
