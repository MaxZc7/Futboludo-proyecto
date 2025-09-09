import { type APIRoute } from 'astro';
import { getRandomPlayer } from '../../database/client';

export const GET: APIRoute = async ({ request }) => {
  try {
    const player = await getRandomPlayer();
    console.log(player.rows[0]);

    return new Response(JSON.stringify(player.rows[0]), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response('Internal server Error', { status: 500 });
  }
};
