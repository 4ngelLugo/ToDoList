import { useState, useEffect } from 'react'

export default function useUbicacion() {
  const [ubicacion, setUbicacion] = useState({
    lat: null,
    lon: null,
  })

  useEffect(() => {
    const fetchUbicacion = async () => {
      try {
        const res = await fetch("http://ip-api.com/json/")

        const response = await res.json()

        const { lat, lon } = response
        setUbicacion({ lat, lon })
      } catch (err) {
        console.error(err)
      }
    }

    fetchUbicacion()
  }, [])

  return ubicacion
}
