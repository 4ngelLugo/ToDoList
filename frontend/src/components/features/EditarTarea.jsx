import useEditarTarea from "../../hooks/useEditarTarea"
import useObtenerTareas from "../../hooks/useObtenerTareas"

export default function EditarTarea({ setAlerta, tareaEditar, setVista }) {

  const { tareas: tarea } = useObtenerTareas({ setAlerta, tareaId: tareaEditar })

  const { handleSubmit, formRef } = useEditarTarea({ setAlerta, tareaId: tareaEditar, setVista })

  return (
    <>
      {tarea && (
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form__input">
            <label htmlFor="titulo">Titulo</label>
            <input type="text" id="titulo" name="titulo" defaultValue={tarea.titulo} />
          </div>
          <div className="form__input">
            <label htmlFor="titulo">Descripción</label>
            <textarea id="descripcion" name="descripcion" defaultValue={tarea.descripcion} />
          </div>
          <div className="form__input">
            <label htmlFor="ciudad">Ciudad</label>
            <input type="text" id="ciudad" name="ciudad" defaultValue={tarea.ciudad} />
          </div>

          <button type="submit">Editar Tarea</button>
        </form>
      )}
    </>
  )
}
