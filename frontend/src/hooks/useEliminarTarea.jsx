import { useState } from "react"

export default function useEliminarTarea({ setAlerta, recargar }) {

  const [tareaEliminar, setTareaEliminar] = useState({ id: null, titulo: null })
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleEliminar = async () => {
    const ENDPOINT = 'http://localhost/PruebaTecnicaBrangus/backend/tareas/eliminar.php?tarea_id='

    try {
      const res = await fetch(`${ENDPOINT}${tareaEliminar.id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
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
        // Limpiar selección después de eliminar
        setTareaEliminar({ id: null, titulo: null })
        setMostrarModal(false)
        recargar()

        setAlerta({
          tipo: 'success',
          mensaje: 'Tarea eliminada con exito',
          isActiva: true
        })
      }

    } catch (e) {
      console.error(e)
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error en la petición',
        isActiva: true
      })
    }
  }

  return {
    handleEliminar,
    tareaEliminar,
    setTareaEliminar,
    mostrarModal,
    setMostrarModal
  }
}
