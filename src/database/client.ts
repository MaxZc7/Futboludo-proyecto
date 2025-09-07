import { createClient } from '@libsql/client';

export const client = createClient({
  url: import.meta.env.DATABASE_URL,
  authToken: import.meta.env.DATABASE_TOKEN,
});

export const getGames = async () => {
  const result = await client.execute({
    sql: 'SELECT * FROM juegos',
    args: [],
  });

  return result;
};
