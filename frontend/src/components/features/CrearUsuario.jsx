import useCrearUsuario from "../../hooks/useCrearUsuario"

export default function CrearUsuario({ setAlerta, modal, setModal }) {

  // Hook para hacer la petición de crear el usuario
  const { handleSubmit, formRef } = useCrearUsuario({ setAlerta, setModal })

  return (
    <>
      {modal === 'crearUsuario' && (
        <div className="modal__container">
          <form ref={formRef} onSubmit={handleSubmit} className='modal'>
            <p className="form__title">Crear Usuario</p>
            <div className="form__input">
              <label htmlFor="correo">Correo Electronico</label>
              <input type="email" id="correo" name="correo" placeholder="Correo electronico del usuario" />
            </div>
            <div className="form__input">
              <label htmlFor="contrasena">Contraseña</label>
              <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña del usuario" />
            </div>

            <div className="form__buttons">
              <button type='button' onClick={() => setModal(null)} className="icon--delete">Cancelar</button>
              <button type="submit" className="icon--create">Crear Usuario</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
