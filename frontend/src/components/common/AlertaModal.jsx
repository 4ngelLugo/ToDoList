import danger from '../../assets/icons/danger.svg'

export default function AlertaModal({
  titulo,
  mensaje,
  mostrarModal,
  setMostrarModal,
  accion
}) {
  return (
    <>
      {mostrarModal && (
        <div>
          <div>
            <img src={danger} alt='icono de alerta' />
            {titulo && <p>{titulo}</p>}
            {mensaje && <span>{mensaje}</span>}

            <div>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button onClick={() => accion()}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
