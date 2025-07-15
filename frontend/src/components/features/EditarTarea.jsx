import useEditarTarea from "../../hooks/useEditarTarea"
import useObtenerTareas from "../../hooks/useObtenerTareas"

export default function EditarTarea({
  setAlerta,
  tareaEditar,
  setTareaEditar,
  modal,
  setModal,
  recargar
}) {

  // Obtiene la información de la tarea a editar
  const { tareas: tarea } = useObtenerTareas({ setAlerta, tareaId: tareaEditar })

  // Hook para la petición de editar la terea
  const { handleSubmit, formRef } = useEditarTarea({
    setAlerta,
    tareaId: tareaEditar,
    setModal,
    recargar,
    setTareaEditar
  })

  return (
    <>
      {modal === 'editarTarea' &&
        tarea && (
          <div className="modal__container">
            <form ref={formRef} onSubmit={handleSubmit} className='modal'>
              <p className="form__title">Editar Tarea</p>
              <div className="form__input">
                <label htmlFor="titulo">Titulo</label>
                <input type="text" id="titulo" name="titulo" placeholder="Titulo de la tarea" defaultValue={tarea.titulo} />
              </div>
              <div className="form__input">
                <label htmlFor="titulo">Descripción</label>
                <textarea id="descripcion" name="descripcion" placeholder="Descripción de la tarea" defaultValue={tarea.descripcion} />
              </div>

              <div className="form__buttons">
                <button type='button' onClick={() => setModal(null)} className="icon--delete">Cancelar</button>
                <button type="submit" className="icon--create">Editar Tarea</button>
              </div>
            </form>
          </div>
        )}
    </>
  )
}
