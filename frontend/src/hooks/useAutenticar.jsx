import { useRef } from 'react'
import { useNavigate } from 'react-router'

export default function useAutenticar({ setAlerta }) {
  const formRef = useRef(null)
  const navigate = useNavigate()

  const URL_AUTH = "http://localhost/PruebaTecnicaBrangus/backend/auth/validarSesion.php"

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
        setAlerta(response.error)
        return
      }

      localStorage.setItem("isAutenticado", response.isAutenticado || false)
      localStorage.setItem("usuario", JSON.stringify(response.usuario) || '')

      navigate('/tareas')
    } catch (e) {
      console.error(e)
      setAlerta("Ocurrió un error en la petición")
    }
  }

  return { handleSubmit, formRef }
}
