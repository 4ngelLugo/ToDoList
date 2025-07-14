import { useState, useRef } from 'react'
import '../styles/App.css'
import Alerta from '../components/common/Alerta'
import CrearUsuario from '../components/features/CrearUsuario'
import CrearTarea from '../components/features/CrearTarea'
import ListarTareas from '../components/features/ListarTareas'

export default function Tareas() {
  const [vista, setVista] = useState('listarTareas')
  const [alerta, setAlerta] = useState({ type: '', message: '', active: false })
  const alertaRef = useRef(null)

  return (
    <>
      <aside>
        <ul>
          <p onClick={() => setVista('listarTareas')}>Listar Tareas</p>
          <p onClick={() => setVista('crearTarea')}>Crear Tarea</p>
          <p onClick={() => setVista('editarTarea')}>Editar Tarea</p>
        </ul>
        <ul>
          <p onClick={() => setVista('crearUsuario')}>Crear Usuario</p>
        </ul>
      </aside>
      <main>
        {vista === 'listarTareas' && (
          <ListarTareas setAlerta={setAlerta} />
        )}
        {vista === 'crearTarea' && (
          <CrearTarea setAlerta={setAlerta} />
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