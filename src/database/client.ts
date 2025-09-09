import { createClient } from '@libsql/client';

export const client = createClient({
  url: import.meta.env.DATABASE_URL,
  authToken: import.meta.env.DATABASE_TOKEN,
});

export const getGames = async () => {
  const result = await client.execute({
    sql: 'SELECT * FROM games',
    args: [],
  });

  return result;
};

function generateRoomCode(length = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createMatch(id_game: number) {
  let roomCode = generateRoomCode();
  let inserted = false;
  let result;

  while (!inserted) {
    try {
      result = await client.execute(
        'INSERT INTO matches (id_game, room_code, status) VALUES (?, ?, ?)',
        [id_game, roomCode, 'lobby']
      );
      inserted = true;
    } catch (err: any) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        roomCode = generateRoomCode();
      } else {
        throw err;
      }
    }
  }

  return {
    id_match: Number(result?.lastInsertRowid),
    room_code: roomCode,
  };
}

export async function getMatchById(id_match: number) {
  const result = await client.execute({
    sql: 'SELECT * FROM matches WHERE id_match = ?',
    args: [id_match],
  });
  return result;
}

export async function getRandomPlayer() {
  const result = await client.execute({
    sql: 'SELECT * FROM fut_players ORDER BY RANDOM() LIMIT 1',
    args: [],
  });
  return result;
}
