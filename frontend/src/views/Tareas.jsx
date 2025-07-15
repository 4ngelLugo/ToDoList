import { useState, useRef } from 'react'
import '../styles/App.css'
import Alerta from '../components/common/Alerta'
import CrearUsuario from '../components/features/CrearUsuario'
import CrearTarea from '../components/features/CrearTarea'
import ListarTareas from '../components/features/ListarTareas'
import EditarTarea from '../components/features/EditarTarea'
import useClimaActual from '../services/useClimaActual'
import useUbicacion from '../services/useUbicacion'

export default function Tareas() {
  const [vista, setVista] = useState('listarTareas')
  const [tareaEditar, setTareaEditar] = useState('listarTareas')
  const [alerta, setAlerta] = useState({ type: '', message: '', active: false })
  const alertaRef = useRef(null)

  const { lat, lon } = useUbicacion()
  const { clima } = useClimaActual({ latitude: lat, longitude: lon })
  console.log(`${clima?.weather[0]?.main} (${clima?.weather[0]?.description})`)

  return (
    <>
      <aside>
        <div>
          <ul>
            <p onClick={() => setVista('listarTareas')}>Listar Tareas</p>
            <p onClick={() => setVista('crearTarea')}>Crear Tarea</p>
          </ul>
          <ul>
            <p onClick={() => setVista('crearUsuario')}>Crear Usuario</p>
          </ul>
        </div>
        <button type="button">Cerrar Sesión</button>
      </aside>
      <main>
        {vista === 'listarTareas' && (
          <ListarTareas
            setAlerta={setAlerta}
            setVista={setVista}
            setTareaEditar={setTareaEditar}
          />
        )}
        {vista === 'crearTarea' && (
          <CrearTarea
            setAlerta={setAlerta}
            setVista={setVista}
          />
        )}
        {vista === 'editarTarea' && (
          <EditarTarea
            setAlerta={setAlerta}
            tareaEditar={tareaEditar}
            setVista={setVista}
          />
        )}
        {vista === 'crearUsuario' && (
          <CrearUsuario setAlerta={setAlerta} />
        )}
      </main>
      <Alerta
        alertaRef={alertaRef}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        isActiva={alerta.isActiva}
        setAlerta={setAlerta}
      />
    </>
  )
}