import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store";
import Navbar from "../shared/components/navbar.component";
import useSocket from "../shared/hooks/use-socket.hook";
import CodeEditor from "./code-editor.component";

const Home = () => {
	const languages = [
		"JavaScript",
		"Python",
		"Java",
		"C++",
		"C",
		"PHP",
		"Ruby",
	];

	return (
		<>
			<Navbar />
			<div className="flex min-h-screen fixed w-full">
				<div className="w-full">
					<div className="flex justify-between h-full items-center ">
						<CodeEditor />
					</div>
				</div>
			</div>
			{/* Header */}
		</>
	);
};

export default Home;
