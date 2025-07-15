import AlertaModal from "../common/AlertaModal"
import useEliminarTarea from "../../hooks/useEliminarTarea"
import useCompletarTarea from "../../hooks/useCompletarTarea"

import '../../styles/listarTareas.css'
import TareaCard from "../common/TareaCard"

export default function ListarTareas({
  setAlerta,
  setModal,
  setTareaEditar,
  tareas, 
  obtenerTareas
}) {

  // Al dar clic en editar, establece la tarea a editar en el estado y muestra el formulario de editar
  const handleEditar = (vista, tareaId) => {
    setTareaEditar(tareaId)
    setModal(vista)
  }

  // Hook para hacer la petición de eleiminar la tarea
  const {
    handleEliminar,
    tareaEliminar,
    setTareaEliminar,
    mostrarModal,
    setMostrarModal
  } = useEliminarTarea({ setAlerta, recargar: obtenerTareas })

  // Al dar clic en eliminar, establece la tarea a elimnar, y muestra la alerta de confirmación
  const handleAlertaModal = (id, titulo) => {
    setTareaEliminar({ id, titulo })
    setMostrarModal(true)
  }

  // Hook para cambiar el estado de las tareas a "completada"
  const { handleCompletar } = useCompletarTarea({ setAlerta, recargar: obtenerTareas })

  return (
    <>
      <section className="lista__tareas">
        {tareas ? tareas.map(({
          id,
          titulo,
          descripcion,
          usuarioCorreo,
          estado,
          fechaCreacion,
          ciudad,
          fraseMotivacional
        }) => (
          <TareaCard
            key={id}
            id={id}
            titulo={titulo}
            estado={estado}
            completar={handleCompletar}
            descripcion={descripcion}
            fraseMotivacional={fraseMotivacional}
            correo={usuarioCorreo}
            fechaCreacion={fechaCreacion}
            ciudad={ciudad}
            editar={handleEditar}
            eliminar={handleAlertaModal}
          />
        )) : (
          <div>
            <span colSpan={9}>No se encontró ninguna tarea.</span>
          </div>
        )}
      </section>

      <AlertaModal
        titulo='¿Esta seguro que desea eliminar esta tarea?'
        mensaje={tareaEliminar.titulo}
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        accion={handleEliminar}
      />
    </>
  )
}
