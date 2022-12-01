import CodeEditor from "../components/CodeEditor"
import Navbar from "../components/Navbar"


const Home = () => {
  return (

    <div className="flex min-h-screen fixed w-full">
      {/* <div>
        <Sidebar />
      </div> */}
      <div className="w-full">

        {/* <Navbar /> */}
        <div className="flex justify-between h-full items-center ">
          <div className="w-80 bg-gray-900 flex text-cyan-50 h-full flex-col ">
            {/* <div className="">SIDEBAR</div> */}
            <ul>
              <li className=" rounded">
                <h3 className="text-lg bg-gray-800 px-3 py-2">This is a problem title</h3>
              </li>
              <li className=" rounded">
                <h3 className="text-lg bg-gray-900 px-3 py-2  hover:bg-gray-800">This is a problem title</h3>
              </li>
              <li className="rounded">
                <h3 className="text-lg bg-gray-900 px-3 py-2 hover:bg-gray-800">This is a problem title</h3>
              </li>
              <li className="rounded">
                <h3 className="text-lg bg-gray-900 px-3 py-2 hover:bg-gray-800">This is a problem title</h3>
              </li>

            </ul>
          </div>


          <CodeEditor />
        </div>
      </div>

    </div>

  )
}

export default Home