import { type APIRoute } from 'astro';
import { createMatch } from '../../database/client';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id_game } = await request.json();

    if (!id_game) {
      return new Response(JSON.stringify({ error: 'id_game is required' }), {
        status: 400,
      });
    }

    const match = await createMatch(id_game);

    return new Response(JSON.stringify(match), { status: 201 });
  } catch (err) {
    console.error('Error creating match:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};
