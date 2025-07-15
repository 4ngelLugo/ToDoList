import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import '../styles/App.css'
import Alerta from '../components/common/Alerta'
import CrearUsuario from '../components/features/CrearUsuario'
import CrearTarea from '../components/features/CrearTarea'
import ListarTareas from '../components/features/ListarTareas'
import EditarTarea from '../components/features/EditarTarea'
import useObtenerTareas from "../hooks/useObtenerTareas"
import useClimaActual from '../services/useClimaActual'
import useUbicacion from '../services/useUbicacion'
import AlertaModal from '../components/common/AlertaModal'

export default function Tareas() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAutenticado') === 'true')
  const [cerrar, setCerrar] = useState(false)
  const navigate = useNavigate()

  const [modal, setModal] = useState('listarTareas')
  const [tareaEditar, setTareaEditar] = useState('listarTareas')

  const [alerta, setAlerta] = useState({ type: '', message: '', active: false })
  const alertaRef = useRef(null)

  useEffect(() => {
    if (!isAuthenticated) navigate('/inicio')
  }, [isAuthenticated, navigate])

  const { lat, lon, ciudad } = useUbicacion()
  const { clima } = useClimaActual({ latitude: lat, longitude: lon })

  // Obtiene los datos del usuario que inicion sesión para listar las tareas con su id
  const usuarioData = localStorage.getItem('usuario')
  const usuario = usuarioData ? JSON.parse(usuarioData) : null

  const { tareas, obtenerTareas } = useObtenerTareas({
    setAlerta,
    usuarioId: usuario?.id || null
  })

  return (
    <>
      {isAuthenticated === true && (
        <>
          <aside className='sidebar'>
            <div className='sidebar__buttons'>
              <div className="clima">
                {clima ? (
                  <>
                    <div className='clima__icon'>
                      <img
                        src={`https://openweathermap.org/img/wn/${clima?.weather[0]?.icon}@2x.png`}
                        alt={clima?.weather[0]?.description}
                        width={50}
                      />
                    </div>
                    <span>{`${clima?.weather[0]?.main} (${clima?.weather[0]?.description})`}</span>
                  </>
                ) : (
                  <p>Cargando...</p>
                )}
              </div>

              <ul>
                <p onClick={() => setModal('crearTarea')} className='sidebar__button' >Crear Tarea</p>
                <p onClick={() => setModal('crearUsuario')} className='sidebar__button' >Crear Usuario</p>
              </ul>
            </div>
            <button onClick={() => setCerrar(true)} type="button" className='cerrar_sesion'>Cerrar Sesión</button>
          </aside>
          <main className='tareas__main'>
            <ListarTareas
              setAlerta={setAlerta}
              setModal={setModal}
              setTareaEditar={setTareaEditar}
              obtenerTareas={obtenerTareas}
              tareas={tareas}
            />

            {modal === 'crearTarea' && (
              <CrearTarea
                setAlerta={setAlerta}
                ciudad={ciudad}
                clima={`${clima?.weather[0]?.main} (${clima?.weather[0]?.description})`}
                modal={modal}
                setModal={setModal}
                recargar={obtenerTareas}
              />
            )}
            {modal === 'editarTarea' && (
              <EditarTarea
                setAlerta={setAlerta}
                tareaEditar={tareaEditar}
                modal={modal}
                setModal={setModal}
                recargar={obtenerTareas}
              />
            )}
            {modal === 'crearUsuario' && (
              <CrearUsuario
                setAlerta={setAlerta}
                modal={modal}
                setModal={setModal}
              />
            )}
          </main>
          <Alerta
            alertaRef={alertaRef}
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            isActiva={alerta.isActiva}
            setAlerta={setAlerta}
          />

          <AlertaModal
            titulo='¿Esta seguro que desea cerrar la sesión?'
            mostrarModal={cerrar}
            setMostrarModal={setCerrar}
            setIsAuthenticated={setIsAuthenticated}
          />
        </>
      )}
    </>
  )
}