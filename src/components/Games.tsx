import { useEffect, useState } from 'preact/hooks';

interface Game {
  id_game: number;
  type: string;
  created_at: string;
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('/api/games', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setGames(data);
        console.log(data);
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
    getData();
  }, []);

  return (
    <section class="w-full flex flex-col items-center gap-6 text-white justify-center font-[Montserrat]">
      <h2 class="text-3xl  pt-6">Juegos disponibles</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id_game}>
            <a
              href={game.type}
              class="rounded-xl bg-[#48566d] py-1 px-4 border-[1px] flex flex-col gap-2 justify-center items-center "
            >
              <img
                src={`/icono-${game.type}.png`}
                alt="Imagen impostor"
                class="rounded-xl"
              />
              <strong>{game.type}</strong>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
