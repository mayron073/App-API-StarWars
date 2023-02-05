import { useState, useEffect} from 'react'
import { getPeople, getCharacter } from './Api/People' 

function App() {
  
  const [ data, setData ] = useState([]) 
  const [ currentCharacter, setCurrentCharacter ] = useState(1)
  const [ details, setDetails ] = useState({})
  const [page, setPage] = useState(1)
  const [ errorState, setErrorState ] = useState({ hasError: false })

  useEffect(() => {
    getPeople(page)
      .then((obj) => {
        setData(obj);
        console.log(obj);
        })
      .catch(handleError)
  },[page])

  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails).catch(handleError)
  }, [currentCharacter])

  const handleError = () => {
    setErrorState({hasError: true, message: err.message })
  }

  const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0])
    setCurrentCharacter(id)
    console.log(id)
  } 

  const nextPage = (next) => {
    if (!data.previous && page + next <= 0) return

    if (!data.next && page + next >= 9) return

    setPage(page + next)

  }

  const previousPage = (prev) => {
    if (!data.previous && page + prev <= 0) return

    if (!data.next && page + prev >= 9) return

    setPage(page + prev)
  }

  return (
    <div className='bg-zinc-700 h-screen'>
        <div className='container bg-gray-800 text-white p-4 rounded-2xl mx-auto max-w-md'>
        <div className='text-sm'>
          <h1 className='text-center mb-2 font-semibold'>Personajes de Stars Wars</h1>
          <ul className='ml-10 font-mono'>
            {errorState.hasError && <div>{errorState.message}</div>}
            {
              data?.results?.map((character) => (
                <li key={character.name}>
                  {character.name}
                  <button 
                    onClick={() => showDetails(character)}
                    className='bg-red-600 px-1 rounded-sm mt-3 ml-3 hover:bg-red-500'
                    >Detalles</button>
                </li>    
            ))}
          </ul>
        </div>
        <div className='mb-6 text-sm'>
          <button 
            onClick={() => previousPage(-1)}
              className='bg-green-700 px-2 rounded-sm mt-4 ml-28 mr-4 hover:bg-green-600 font-mono'
            >Anterior</button>
          {page}
          <button 
            onClick={() => nextPage(+1)}
            className='bg-green-700 px-1 rounded-sm mt-4 ml-4 hover:bg-green-600 font-mono'
            >Siguiente</button>
        </div>
        {details && (
          <div className='text-sm pb-2'>
            <h1 className='text-center mb-2 font-semibold'>Detalles de Personaje</h1>
            <ul className='ml-10 font-mono'>
              <li className='mb-1'>Nombre: {details.name}</li>
              <li className='mb-1'>Height: {details.height}</li>
              <li className='mb-1'>Gender: {details.gender}</li>
              <li className='mb-1'>Eye color: {details.eye_color}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
