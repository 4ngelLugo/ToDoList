export default function AlertaModal ({
  titulo,
  mensaje,
  mostrarModal,
  setMostrarModal,
  accion
}) {
  return (
    <>
      {mostrarModal && (
        <div className='modal__container'>
          <div className='modal'>
            <div className='modal__icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 21 21'
                className='icon icon--alerta'
              >
                <g
                  fill='none'
                  fillRule='evenodd'
                  transform='translate(1 1)'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                    d='m9.5.5l9 16H.5zm0 10v-5'
                  />
                  <circle cx='9.5' cy='13.5' r='1' fill='currentColor' />
                </g>
              </svg>
            </div>
            {titulo && <p className='modal__title'>{titulo}</p>}
            {mensaje && <span className='modal__message'>{mensaje}</span>}

            <div className='modal__buttons'>
              <button
                onClick={() => setMostrarModal(false)}
                className='icon--delete'
                style={{ filter: 'grayScale(1)' }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  accion()
                  setMostrarModal(false)
                }}
                className='icon--delete'
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
