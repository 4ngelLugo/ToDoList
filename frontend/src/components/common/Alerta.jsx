import { useEffect } from 'react'

export default function Alerta ({ alertaRef, tipo, mensaje, isActiva, setAlerta }) {
  useEffect(() => {
    // Si el elemento de la alerta no existe, no se ejecuta el efecto
    if (!alertaRef.current) return

    // Si la alerta esta activa, configura un temporizador para ocultarla después de 5 segundos
    if (isActiva) {
      const timeout = setTimeout(() => {
        setAlerta({
          tipo: '',
          mensaje: '',
          isActiva: false
        })
      }, 5000)

      // Limpia el temporizador cuando el componente se desmonte o cuando la alerta se desactive
      return () => clearTimeout(timeout)
    }
  }, [isActiva, setAlerta, alertaRef])

  return (
    <div ref={alertaRef} className={`alerta ${isActiva ? `alerta--activa ${tipo}` : ''}`}>
      <span>{mensaje}</span>
    </div>
  )
}
