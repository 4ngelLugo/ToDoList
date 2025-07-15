import useCrearTarea from "../../hooks/useCrearTarea"
import '../../styles/modalForm.css'

export default function CrearTarea({
  setAlerta,
  ciudad,
  clima,
  modal,
  setModal,
  recargar
}) {

  // Hace la petición para crear la tarea
  const { handleSubmit, formRef } = useCrearTarea({ setAlerta, ciudad, clima, setModal, recargar })

  return (
    <>
      {modal === 'crearTarea' && (
        <div className="modal__container">
          <form ref={formRef} onSubmit={handleSubmit} className='modal'>
            <p className="form__title">Crear Tarea</p>
            <div className="form__input">
              <label htmlFor="titulo">Titulo</label>
              <input type="text" id="titulo" name="titulo" placeholder="Titulo de la tarea" />
            </div>
            <div className="form__input">
              <label htmlFor="titulo">Descripción</label>
              <textarea id="descripcion" name="descripcion" placeholder="Descripción de la tarea" />
            </div>

            <div className="form__buttons">
              <button type='button' onClick={() => setModal(null)} className="icon--delete">Cancelar</button>
              <button type="submit" className="icon--create">Crear Tarea</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
