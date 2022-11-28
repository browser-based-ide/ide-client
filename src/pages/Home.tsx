import { Link } from 'react-router-dom'

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <div className='flex justify-start py-52 flex-col items-center min-h-[90vh] bg-gray-100 '>
      <h1 className='font-bold leading-tight text-9xl mt-0 mb-2 text-gray-900 font-serif'>
        Browser based editor
      </h1>
      <div className='flex gap-2'>
        <button className='px-4 py-2 bg-orange-500 rounded-sm'>
          <Link to='/login'>Login</Link>
        </button>
        <button className='px-4 py-2 bg-orange-500 rounded-sm'>
          <Link to='/signup'>Signup</Link>
        </button>
      </div>

      <button className='px-4 py-2 bg-orange-500 rounded-sm mt-3'>
        <Link to='/editor'>EDITOR</Link>
      </button>
    </div>
  )
}
