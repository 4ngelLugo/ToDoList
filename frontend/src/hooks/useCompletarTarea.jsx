import { API_BASE } from '../constants/url'

export default function useCompletarTarea ({ setAlerta, recargar }) {
  const handleCompletar = async (id) => {
    // Url del endpoint para completar la tarea
    const ENDPOINT = `${API_BASE}tareas/completar.php?tarea_id=`

    // try {
    const res = await fetch(`${ENDPOINT}${id}`, {
      credentials: 'include',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })

    const response = await res.json()

    if (response.error) {
      setAlerta({
        tipo: 'error',
        mensaje: response.error,
        isActiva: true
      })
      return
    }

    if (response.success) {
      recargar()
    }

    // } catch (e) {
    //   console.error(e)
    //   setAlerta({
    //     tipo: 'error',
    //     mensaje: 'Ocurrió un error en la petición',
    //     isActiva: true
    //   })
    // }
  }

  return { handleCompletar }
}
