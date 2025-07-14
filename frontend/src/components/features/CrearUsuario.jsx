import useCrearUsuario from "../../hooks/useCrearUsuario"

export default function CrearUsuario({ setAlerta }) {

  const { handleSubmit, formRef } = useCrearUsuario({ setAlerta })

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form__input">
          <label htmlFor="correo">Correo Electronico</label>
          <input type="email" id="correo" name="correo" />
        </div>
        <div className="form__input">
          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena" />
        </div>

        <button type="submit">Crear Usuario</button>
      </form>
    </>
  )
}
