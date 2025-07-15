import { useNavigate } from "react-router"

export default function useCerrarSesion({ setIsAuthenticated }) {
  // Hook para cambiar de pagina
  const navigate = useNavigate()

  // Url del endpoint para cerrar la sesión
  const ENDPOINT_CERRAR = 'http://localhost/PruebaTecnicaBrangus/backend/auth/cerrarSesion.php'

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
