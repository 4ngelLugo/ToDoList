import useCrearTarea from "../../hooks/useCrearTarea"

export default function CrearTarea({ setAlerta }) {

  const { handleSubmit, formRef } = useCrearTarea({ setAlerta })

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form__input">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" id="titulo" name="titulo" />
        </div>
        <div className="form__input">
          <label htmlFor="titulo">Descripción</label>
          <textarea id="descripcion" name="descripcion" />
        </div>
        <div className="form__input">
          <label htmlFor="ciudad">Ciudad</label>
          <input type="text" id="ciudad" name="ciudad" />
        </div>

        <button type="submit">Crear Tarea</button>
      </form>
    </>
  )
}
