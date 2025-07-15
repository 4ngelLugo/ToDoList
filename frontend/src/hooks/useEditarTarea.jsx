import { useRef } from 'react'

export default function useEditarTarea({ setAlerta, tareaId, setModal, recargar }) {
  const formRef = useRef(null)

  const ENDPOINT = "http://localhost/PruebaTecnicaBrangus/backend/tareas/editar.php"

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    // Añade la id de la tarea a editar al objeto FormData para enviarlos en la petición
    formData.append('id', tareaId)

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
        credentials: 'include'
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
        setAlerta({
          tipo: 'success',
          mensaje: 'Tarea editada con exito',
          isActiva: true
        })

        recargar()
        setModal(null)
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

  return { handleSubmit, formRef }
}
