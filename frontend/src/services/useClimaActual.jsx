import { useState, useEffect } from 'react';

export default function useClimaActual({ latitude, longitude }) {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) return

    const fetchClima = async () => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        const res = await fetch(url);

        const response = await res.json();

        setClima(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClima();
  }, [latitude, longitude]);

  return { clima };
}
