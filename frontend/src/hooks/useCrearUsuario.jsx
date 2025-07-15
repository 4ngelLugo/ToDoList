import { useRef } from 'react'
import { API_BASE } from '../constants/url'

export default function useCrearUsuario ({ setAlerta, setModal }) {
  const formRef = useRef(null)

  const ENDPOINT = `${API_BASE}usuarios/crear.php`

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
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
        setAlerta({
          tipo: 'success',
          mensaje: 'Usuario creado con exito',
          isActiva: true
        })

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
