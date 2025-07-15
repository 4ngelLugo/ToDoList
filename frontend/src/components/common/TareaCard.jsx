export default function TareaCard({
  id,
  titulo,
  estado,
  completar,
  descripcion,
  fraseMotivacional,
  correo,
  fechaCreacion,
  ciudad,
  editar,
  eliminar
}) {
  return (
    <div className='card'>
      <header className='card__header'>
        <span className='card--title'>{titulo}</span>
        {estado !== 'completada' ? (
          <div onClick={() => completar(id)} className='icon--complete'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 21"
              className="icon"
            >
              <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M14.857 3.79a8 8 0 1 0 2.852 3.24" />
                <path d="m6.5 9.5l3 3l8-8" />
              </g>
            </svg>
            <span>Completar</span>
          </div>
        ) : (
          <span className='card__estado'>{estado}</span>
        )}
      </header>
      <article className='card__descripcion'>
        <p>{descripcion}</p>
        <p>"{fraseMotivacional}"</p>
      </article>
      <footer className='card__footer'>
        <span>{correo}</span>
        <span className="card--fecha">{`${fechaCreacion} - ${ciudad}`}</span>
        <div className='card__icons'>
          <div onClick={() => editar('editarTarea', id)} className='icon--edit'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 21"
              className="icon"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M10 4.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
                <path d="M17.5 3.467a1.46 1.46 0 0 1-.017 2.05L10.5 12.5l-3 1l1-3l6.987-7.046a1.41 1.41 0 0 1 1.885-.104zm-2 2.033l.953 1" />
              </g>
            </svg>
            <span>Editar</span>
          </div>

          <div onClick={() => eliminar(id, titulo)} className='icon--delete'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 21"
              className="icon"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2m-7 2h14m-9 3v8m4-8v8"
              />
            </svg>
            <span>Eliminar</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
