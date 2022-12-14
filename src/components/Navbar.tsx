import { Link, useLocation } from 'react-router-dom'
import useCodeEditorState, { languagesOptions } from '../store/codeRunner'

const Navbar = () => {
  const location = useLocation()
  const [language, codeSnippet, runCodeSnippet, setLanguage] =
    useCodeEditorState(state => [
      state.language,
      state.codeSnippet,
      state.runCodeSnippet,
      state.setLanguage,
    ])

  const languagesOptions = ['Python', 'JavaScript', 'Cpp', 'Java']
  const onLanguageChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault()
    console.log('User Selected Value - ', event.target.value)
    setLanguage(event.target.value as languagesOptions)
  }

  const handleCodeSubmit = () => {
    runCodeSnippet(codeSnippet, language)
  }

  return (
    <nav className='py-2 px-4 flex justify-between bg-gray-900 items-center text-gray-50'>
      <Link to='/'>
        <div className='font-mono text-2xl font-bold cyan-500 text-gray-900'>
          <h1 className='text-[#DDFF33]'>

            EDITOR
          </h1>
        </div>
      </Link>

      {location.pathname === '/editor' && (

      <div className='flex'>
     
          <button
            onClick={handleCodeSubmit}
            className='bg-green-500 px-6  rounded mr-2 text-gray-900 text-base font-bold'
          >
            RUN
          </button>
      
        <select
          onChange={onLanguageChangeHandler}
          className='px-4 py-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        >
          {/* <option selected value='Python'>
            Python
          </option> */}
          {languagesOptions.map((option, index) => {
            return <option key={index}>{option}</option>
          })}
        </select>
      </div>
      )}
      {/* <div>
        <ul className='flex gap-4 justify-center items-center'>
          <li>Logout</li>
        </ul>
      </div> */}
    </nav>
  )
}

export default Navbar
