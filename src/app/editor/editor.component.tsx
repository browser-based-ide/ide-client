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

	// socket io
	const { sessionId } = useParams();
	const editorRef = useRef(null);
	const authUserName = useAuthStore((state) => state.userName);

	const { currentUserJoined, socketRef } = useSocket(
		sessionId,
		authUserName,
		editorRef
	);

	return (
		<>
			<Navbar />
			<div className="flex w-full h-[calc(100vh-3.5rem)]">
				{/* <div className="w-full"> */}
				<CodeEditor
					socketRef={socketRef}
					sessionId={sessionId}
					editorRef={editorRef}
				/>
				{/* </div> */}
			</div>
			{/* Header */}
		</>
	);
};

export default Home;
