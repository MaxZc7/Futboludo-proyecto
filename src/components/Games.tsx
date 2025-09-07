import { useEffect, useState } from 'preact/hooks';

export default function Games() {
  const [data, setData] = useState({});

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
        setData(data);
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
    <div>
      <p>Juegos: </p>
    </div>
  );
}
