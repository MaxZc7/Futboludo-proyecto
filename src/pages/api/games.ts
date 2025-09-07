import { type APIRoute } from 'astro';
import { getGames } from '../../database/client';

export const GET: APIRoute = async ({ request }) => {
  try {
    const games = await getGames();
    return new Response(JSON.stringify(games.rows), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response('Internal server Errror', { status: 500 });
  }
};
