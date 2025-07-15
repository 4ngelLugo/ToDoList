import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../constants/url'

export default function useAutenticar ({ setAlerta }) {
  // Referencia del formulario, para obtener sus datos
  const formRef = useRef(null)
  // Hook para cambiar de pagina
  const navigate = useNavigate()

  // URL del endpoint de autenticación
  const URL_AUTH = `${API_BASE}auth/validarSesion.php`

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)

    try {
      const res = await fetch(URL_AUTH, {
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

      localStorage.setItem('isAutenticado', response.isAutenticado || false)
      localStorage.setItem('usuario', JSON.stringify(response.usuario) || '')
      localStorage.setItem('token', response.token || '')

      navigate('/tareas')
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
