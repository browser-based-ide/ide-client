import CodeEditor from "../components/CodeEditor"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Home = () => {
  return (

      <div className="flex min-h-screen fixed w-full">
        {/* <div>
        <Sidebar />
      </div> */}
        <div className="w-full">

          {/* <Navbar /> */}
          <div className="flex justify-between h-full">
            <div className="w-80 bg-gray-900 flex text-cyan-50">
              <h3 >FILES</h3>
            </div>


            <CodeEditor />
          </div>
        </div>

      </div>

  )
}

export default Home