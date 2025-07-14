import { useState, useRef } from 'react'
import '../styles/App.css'
import CrearUsuario from '../components/features/CrearUsuario'
import Alerta from '../components/common/Alerta'

function App() {
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

export default App
