import useObtenerTareas from "../../hooks/useObtenerTareas"

export default function ListarTareas({ setAlerta }) {

  const { tareas } = useObtenerTareas({ setAlerta })

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
            </tr>
          )) : (
            <tr>
              <td colSpan={8}>No se encontró ninguna tarea.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}
