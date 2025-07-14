import { useState } from 'react'
import '../styles/App.css'
import useAutenticar from '../hooks/useAutenticar'

export default function Login() {

  const [alerta, setAlerta] = useState(null)

  const { handleSubmit, formRef } = useAutenticar({ setAlerta })

  return (
    <>
      <h2>Hola</h2>
      <form ref={formRef} onSubmit={handleSubmit}>

        <input type="email" id='correo' name='correo' />
        <input type="password" id='contrasena' name='contrasena' />

        <button type="submit">Enviar</button>
      </form>
      <div>{alerta}</div>
    </>
  )
}