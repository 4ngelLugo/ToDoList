import { useRef } from 'react'
import useFraseMotivacional from '../services/useFraseMotivacional'

export default function useCrearTarea({ setAlerta, setVista }) {
  const formRef = useRef(null)

  // Obtiene los datos del usuario que inicion sesión para enviar su id en la tarea
  const usuarioData = localStorage.getItem('usuario')
  const usuario = usuarioData ? JSON.parse(usuarioData) : null

  // Devuelve la función para obtener frases motivacionales de quotable.io
  const { getFrase } = useFraseMotivacional()

  const ENDPOINT = "http://localhost/PruebaTecnicaBrangus/backend/tareas/crear.php"

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    // Obtiene una frase motivacional de la api quotable.io
    let frase = await getFrase()

    // Añade datos que no ingresa el usuario al objeto FormData para enviarlos en la petición
    formData.append('usuario_id', usuario.id)
    formData.append('clima_actual', 'Soleado')
    formData.append('frase_motivacional', frase)

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
          mensaje: 'Tarea creada con exito',
          isActiva: true
        })

        setVista('listarTareas')
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
