import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../constants/url'

export default function useCerrarSesion ({ setIsAuthenticated }) {
  // Hook para cambiar de pagina
  const navigate = useNavigate()

  // Url del endpoint para cerrar la sesión
  const ENDPOINT_CERRAR = `${API_BASE}auth/cerrarSesion.php`

  const cerrarSesion = async () => {
    const res = await fetch(ENDPOINT_CERRAR, {
      method: 'POST',
      credentials: 'include'
    })

    const response = await res.json()

    if (response.success) {
      localStorage.clear()
      setIsAuthenticated(false)

      navigate('/inicio')
    }
  }

  return { cerrarSesion }
}
