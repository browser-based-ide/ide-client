import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store";
import useCodeEditorState from "../../store/code-runner";
import useDrawCursor from "../shared/hooks/use-drawCursor";
import useSocket from "../shared/hooks/use-socket.hook";
import { SocketActions } from "../shared/utils/socket.util";

// loader.config({ monaco });

const CodeEditor: React.FC = () => {
	const options: monaco.editor.IStandaloneEditorConstructionOptions = {
		minimap: {
			enabled: false,
		},
		fontSize: 16,
		fontFamily: "IBM Plex Mono",
		autoClosingQuotes: "always",
		automaticLayout: true,
		colorDecorators: true,
		dragAndDrop: true,
		mouseWheelZoom: true,
		overviewRulerLanes: 2,
		rulers: [],
		// smoothScrolling: false,
		wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
		wordWrapBreakAfterCharacters: "\t})]?|&,;",
		wordWrapBreakBeforeCharacters: "{([+",
		cursorBlinking: "solid",
	};

	const authUserName = useAuthStore((state) => state.userName);
	// TODO remove dependency on zustand store
	const [language, output, consoleError] = useCodeEditorState((state) => [
		state.language,
		state.output,
		state.consoleError,
	]);

	const [code, setCode] = useState("");
	const { sessionId } = useParams();
	const editorRef = useRef(null);
	// const [decorator, setDecorator] = useState([]);
	const [cursorDecorator, setCursorDecorator] = useState<{
		[key: string]: { decorator: string[] };
	}>(null);
	const [cursors, setCursors] = useState<{
		[key: string]: {
			userName: string;
			cursorPosition: { lineNumber: number; column: number };
		};
	}>(null);

	// TODO remove dependency from cursorPosition
	const [cursorPosition, setcursorPosition] = useState<{
		lineNumber: number;
		column: number;
	}>(null);

	useDrawCursor(
		editorRef,
		cursorPosition,
		cursors,
		setCursorDecorator,
		cursorDecorator
	);

	const { currentUserJoined, socketRef } = useSocket(
		sessionId,
		authUserName,
		editorRef,
		setCursors,
		setCode
	);

	// set code on language change
	useEffect(() => {
		if (language === "Javascript") {
			setCode(`console.log('Hello World')`);
		} else if (language === "Python") {
			setCode(`print('Hello World')`);
		} else if (language === "Java") {
			setCode(`System.out.println("Hello World");`);
		} else if (language === "Cpp") {
			setCode(`#include <iostream>
    using namespace std;
    int main() {
    cout << "Hello World";
    return 0;
    }`);
		}
	}, [language]);

	const handleEditorChange = (value: string | undefined, event: any) => {
		if (value) {
			if (!event.changes[0].forceMoveMarkers) {
				socketRef.current.emit(SocketActions.CODE_CHANGED, {
					sessionId,
					code: value,
					userName: authUserName,
				});
			}
		}
	};

	const handleEditorDidMount = (editor, monaco) => {
		editorRef.current = editor;
		editor.focus();
		setcursorPosition(editor.getPosition());
		socketRef.current.emit(SocketActions.CURSOR_POSITION_CHANGED, {
			sessionId,
			cursorPosition: editor.getPosition(),
			userName: authUserName,
		});

		editor.onDidChangeCursorPosition((e) => {
			if (e.source === "mouse" || e.source === "keyboard") {
				setcursorPosition(e.position);
				socketRef.current.emit(SocketActions.CURSOR_POSITION_CHANGED, {
					sessionId,
					cursorPosition: e.position,
					userName: authUserName,
				});
			}
		});
	};

	return (
		<>
			<div className="h-full w-full">
				<div className="flex h-full">
					<div className="flex-1">
						<Editor
							theme={"vs-dark"}
							options={options}
							onChange={handleEditorChange}
							onMount={handleEditorDidMount}
							language={language.toLocaleLowerCase()}
							value={code}
						/>
					</div>
					<div className=" bg-[#1e1e1e] text-cyan-50 p-2 flex-1 flex flex-col gap-4">
						<div className="flex w-full gap-4">
							<div className="flex flex-col flex-1">
								<label htmlFor="input">User input</label>
								<textarea
									name="args"
									placeholder="User input"
									className=" text-gray-100 bg-gray-200 w-full h-36 xl:h-44 dark:bg-neutral-800 focus:outline-none rounded-sm p-3 md:p-4 my-3"
									id="args"></textarea>
							</div>
							<div className="flex flex-col flex-1">
								<label htmlFor="input">CLI Arguments</label>
								<textarea
									name="args"
									placeholder="CLI Arguments"
									className=" text-gray-100 bg-gray-200 w-full h-36 xl:h-44 dark:bg-neutral-800 focus:outline-none rounded-sm p-3 md:p-4 my-3"
									id="args"></textarea>
							</div>
						</div>
						<h3 className="border-b-[1px] border-neutral-700">
							Output
						</h3>
						<div
							style={{ whiteSpace: "pre-wrap" }}
							className="text-green-600 h-1/2">
							{output.length > 0 ? output : ""}
						</div>
						<h3 className="border-b-[1px] border-neutral-700">
							Errors
						</h3>
						<div className="text-red-500">
							{consoleError.length > 0 ? consoleError : ""}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CodeEditor;
