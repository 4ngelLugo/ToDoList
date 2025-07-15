import { useRef } from 'react'
import useFraseMotivacional from '../services/useFraseMotivacional'

export default function useCrearTarea({ setAlerta, ciudad, clima, setModal, recargar }) {
  // Referencia del formulario para obtener sus datos
  const formRef = useRef(null)

  // Obtiene los datos del usuario que inicion sesión para enviar su id en la tarea
  const usuarioData = localStorage.getItem('usuario')
  const usuario = usuarioData ? JSON.parse(usuarioData) : null

  // Devuelve la función para obtener frases motivacionales aleatorias de quotable.io
  const { getFrase } = useFraseMotivacional()

  // Url del endpoint para crear la tarea
  const ENDPOINT = "http://localhost/PruebaTecnicaBrangus/backend/tareas/crear.php"

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    // Obtiene una frase motivacional de la api quotable.io
    let frase = await getFrase()

    // Añade datos que no ingresa el usuario al objeto FormData para enviarlos en la petición
    formData.append('usuario_id', usuario.id)
    formData.append('ciudad', ciudad)
    formData.append('clima_actual', clima)
    formData.append('frase_motivacional', frase)

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
        credentials: 'include',
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
        setAlerta({
          tipo: 'success',
          mensaje: 'Tarea creada con exito',
          isActiva: true
        })

        recargar()
        setModal('')
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
