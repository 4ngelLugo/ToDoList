import { useRef, useState } from 'react'
import '../styles/login.css'
import useAutenticar from '../hooks/useAutenticar'
import Alerta from '../components/common/Alerta'

export default function Login() {

  const [alerta, setAlerta] = useState({ type: '', message: '', active: false })
  const alertaRef = useRef(null)

  const { handleSubmit, formRef } = useAutenticar({ setAlerta })

  return (
    <main className='container'>
      <form ref={formRef} onSubmit={handleSubmit} className='loginForm'>
        <p className="loginForm__title">Iniciar Sesión</p>

        <div className="loginForm__input">
          <label htmlFor="correo">Correo Electronico</label>
          <input type="email" id="correo" name="correo" placeholder='' />
        </div>
        <div className="loginForm__input">
          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena" placeholder='' />
        </div>

        <button type="submit" className='loginForm__button'>Iniciar</button>
      </form>

      <Alerta
        alertaRef={alertaRef}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        isActiva={alerta.isActiva}
        setAlerta={setAlerta}
      />
    </main>
  )
}