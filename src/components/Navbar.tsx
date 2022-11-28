import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation()

    return (
        <nav className="py-2 px-4 flex justify-between bg-gray-900 items-center text-gray-50">
            <Link to="/" >
                <div>IDE</div>
            </Link>

            <div>


                {
                    location.pathname === '/editor' && <button className="bg-green-500 px-8 py-3  rounded" >Submit</button>
                }
            </div>
            <div>
                <ul className="flex gap-4 justify-center items-center">

                    <li>Logout</li>

                </ul>
            </div>

        </nav>

    )
}


export default Navbar