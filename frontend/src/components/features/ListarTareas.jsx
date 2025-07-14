import useObtenerTareas from "../../hooks/useObtenerTareas"
import edit from '../../assets/icons/edit.svg'
import del from '../../assets/icons/delete.svg'
import complete from '../../assets/icons/complete.svg'
import AlertaModal from "../common/AlertaModal"
import useEliminarTarea from "../../hooks/useEliminarTarea"
import useCompletarTarea from "../../hooks/useCompletarTarea"

export default function ListarTareas({ setAlerta, setVista, setTareaEditar }) {

  // Obtiene los datos del usuario que inicion sesión para listar las tareas con su id
  const usuarioData = localStorage.getItem('usuario')
  const usuario = usuarioData ? JSON.parse(usuarioData) : null

  const { tareas, obtenerTareas } = useObtenerTareas({ setAlerta, usuarioId: usuario.id })

  const handleEditar = (vista, tareaId) => {
    setVista(vista)
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Fecha de creación</th>
            <th>Ciudad</th>
            <th>Frase Motivacional</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
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
            <tr key={id}>
              <td>{id}</td>
              <td>{titulo}</td>
              <td>{descripcion}</td>
              <td>{usuarioCorreo}</td>
              <td>{estado}</td>
              <td>{fechaCreacion}</td>
              <td>{ciudad || 'N/N'}</td>
              <td>{fraseMotivacional || 'N/N'}</td>
              <td>
                <img
                  onClick={() => handleEditar('editarTarea', id)}
                  src={edit}
                  alt="icono de editar tarea"
                />
                <img
                  onClick={() => handleAlertaModal(id, titulo)}
                  src={del}
                  alt="icono de borrar tarea"
                />
                {estado !== 'completada' && (
                  <img
                    onClick={() => handleCompletar(id)}
                    src={complete}
                    alt="icono de completar tarea"
                  />
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={9}>No se encontró ninguna tarea.</td>
            </tr>
          )}
        </tbody>
      </table>

      <AlertaModal
        titulo='¿Esta seguro que desea borrar esta tarea?'
        mensaje={`${tareaEliminar.id} - ${tareaEliminar.titulo}`}
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        accion={handleEliminar}
      />
    </>
  )
}
