import { useCallback, useEffect, useState } from 'react'
import { API_BASE } from '../constants/url'

export default function useObtenerTareas ({ setAlerta, tareaId = null, usuarioId = null }) {
  const [tareas, setTareas] = useState(null)

  const get =
    tareaId
      ? `?tarea_id=${tareaId}`
      : usuarioId
        ? `?usuario_id=${usuarioId}`
        : ''

  const ENDPOINT = `${API_BASE}tareas/index.php`

  const obtenerTareas = useCallback(() => {
    fetch(`${ENDPOINT}${get}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: localStorage.getItem('token')
      }
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
  }, [setAlerta, get, ENDPOINT])

  useEffect(() => {
    obtenerTareas()
  }, [obtenerTareas])

  return { tareas, obtenerTareas }
}
