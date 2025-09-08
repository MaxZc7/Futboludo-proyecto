import { type APIRoute } from 'astro';
import { getMatchById } from '../../../database/client';

export const GET: APIRoute = async ({ params }) => {
  const id_match = Number(params.id);

  if (isNaN(id_match)) {
    return new Response(JSON.stringify({ error: 'Invalid match ID' }), {
      status: 400,
    });
  }
  try {
    const result = await getMatchById(id_match);
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Match not found' }), {
        status: 404,
      });
    }
    const match = result.rows[0];
    return new Response(JSON.stringify(match), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
