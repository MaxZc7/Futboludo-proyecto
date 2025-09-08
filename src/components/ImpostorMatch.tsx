import { useState, useEffect } from 'preact/hooks';

type GameData = {
  id_match: number;
  id_game: number;
  room_code: string;
  status: string;
  started_at: string | null;
  finished_at: string | null;
};

export default function ImpostorMatch(id: any) {
  const [gameData, setGameData] = useState<GameData | null>(null);

  const getGameData = async () => {
    try {
      const response = await fetch(`/api/getMatch/${id.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setGameData(data);
      } else {
        console.error(
          'Error en la solicitud:',
          response.status,
          response.statusText
        );
      }
    } catch (e) {
      console.error('Eror al realizar la solicitud:', e);
      throw e;
    }
  };

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <section class="w-full bg-gray-500 font-[Monserrat] text-white flex justify-center items-center p-2 gap-2 flex-col">
      <h2>Impostor</h2>

      {gameData ? (
        <>
          <h3>Lobby: {gameData.room_code}</h3>
          <p>Match ID: {gameData.id_match}</p>
          <p>Game ID: {gameData.id_game}</p>
          <p>Status: {gameData.status}</p>
          {gameData.started_at && <p>Started at: {gameData.started_at}</p>}
          {gameData.finished_at && <p>Finished at: {gameData.finished_at}</p>}
        </>
      ) : (
        <p>Cargando datos de la partida...</p>
      )}
    </section>
  );
}
