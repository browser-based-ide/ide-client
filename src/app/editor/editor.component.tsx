import Navbar from "../shared/components/navbar.component";
import CodeEditor from "./code-editor.component";

const Home = () => {
	return (
		<>
			<Navbar />
			<div className="flex min-h-screen fixed w-full">
				{/* <div>
        <Sidebar />
      </div> */}
				<div className="w-full">
					{/* <Navbar /> */}
					<div className="flex justify-between h-full items-center ">
						<CodeEditor />
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
