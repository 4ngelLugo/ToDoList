import { useEffect, useState } from "react";

export default function useObtenerTareas({ setAlerta }) {
  const [tareas, setTareas] = useState(null)

  const ENDPOINT = "http://localhost/PruebaTecnicaBrangus/backend/tareas/index.php"

  useEffect(() => {
    fetch(ENDPOINT, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          setAlerta({
            tipo: 'error',
            mensaje: response.error,
            isActiva: true
          })
          return
        }

        if (response.success) {
          setTareas(response.datos)
        }
      })
      .catch(error => {
        console.error(error)
        setAlerta({
          tipo: 'error',
          mensaje: 'Ocurrió un error en la petición',
          isActiva: true
        })
      })
  }, [setAlerta])

  return { tareas }
}
