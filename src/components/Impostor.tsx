import { useState } from 'preact/hooks';

export default function Impostor() {
  const [roomCode, setRoomCode] = useState('');

  async function createRoom(id_game: number) {
    try {
      const res = await fetch('/api/createMatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_game }),
      });

      const data = await res.json();
      console.log('New Room:', data);

      if (data.id_match) {
        window.location.href = `/impostor/matches/${data.id_match}`;
      }
    } catch (err) {
      console.error('Error creating match:', err);
    }
  }

  function joinRoom() {
    if (!roomCode) return;
    // Redirige directamente usando lo que se ingresó como id_match
    window.location.href = `/impostor/matches/${roomCode}`;
  }

  return (
    <section class="w-full bg-[#383550] flex flex-col gap-4 justify-center items-center text-white font-[Montserrat]">
      <h2 class="text-5xl mt-4">Impostor</h2>
      <ul class="flex flex-col gap-2">
        <li>
          <button
            onClick={() => createRoom(1)}
            class="rounded-xl w-full bg-[#48566d] py-1 px-4 border-[1px] gap-2 hover:bg-[#5a6b85] transition hover:cursor-pointer"
          >
            Crear sala
          </button>
        </li>
        <li class="flex flex-col gap-2">
          <input
            class="border-2 rounded-md p-1 text-center text-black"
            type="text"
            placeholder="ID de sala (ej: 2)"
            value={roomCode}
            onInput={(e) => setRoomCode((e.target as HTMLInputElement).value)}
          />
          <button
            onClick={joinRoom}
            class="rounded-xl w-full bg-[#48566d] py-1 px-4 border-[1px] gap-2 hover:bg-[#5a6b85] transition hover:cursor-pointer"
          >
            Unirse
          </button>
        </li>
      </ul>
    </section>
  );
}
