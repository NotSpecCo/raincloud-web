import { refreshTokenRequestSchema } from '$lib/schemas';
import { SoundCloud } from '$lib/server/soundcloud';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	const body = await request.json().then((data) => refreshTokenRequestSchema.safeParse(data));

	if (!body.success) {
		error(400, body.error);
	}

	const clientSecret = platform?.env.SOUNDCLOUD_CLIENT_SECRET as string;

	const tokens = await SoundCloud.refreshToken({
		clientId: body.data.clientId,
		clientSecret,
		refreshToken: body.data.refreshToken
	});

	return json(tokens);
};
