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

  const handleEditar = (vista, tareaId) => {
    setModal(vista)
    setTareaEditar(tareaId)
  }

  const {
    handleEliminar,
    tareaEliminar,
    setTareaEliminar,
    mostrarModal,
    setMostrarModal
  } = useEliminarTarea({ setAlerta, recargar: obtenerTareas })

  const handleAlertaModal = (id, titulo) => {
    setTareaEliminar({ id, titulo })
    setMostrarModal(true)
  }

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
