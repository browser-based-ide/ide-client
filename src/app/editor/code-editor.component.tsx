import { Tab } from "@headlessui/react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store";
import useCodeEditorState, { languagesOptions } from "../../store/code-runner";
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
	const [
		language,
		output,
		consoleError,
		codeSnippet,
		setLanguage,
		runCodeSnippet,
	] = useCodeEditorState((state) => [
		state.language,
		state.output,
		state.consoleError,
		state.codeSnippet,
		state.setLanguage,
		state.runCodeSnippet,
	]);

	const [code, setCode] = useState("");
	const [showConsole, setShowConsole] = useState(true);
	const panelRef = useRef<ImperativePanelHandle>(null);
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

	const languagesOptions = ["Python", "Javascript", "Cpp", "Java"];

	const onLanguageChangeHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		event.preventDefault();
		console.log("User Selected Value - ", event.target.value);
		setLanguage(event.target.value as languagesOptions);
	};

	const handleCodeSubmit = () => {
		runCodeSnippet(codeSnippet, language);
	};

	const handleCodeRun = () => {
		runCodeSnippet(code, language);
	};

	const handlePanelOpen = () => {
		const panel = panelRef.current;
		if (panel) {
			if (showConsole) {
				panel.collapse();
				setShowConsole(false);
			} else {
				panel.expand();
				setShowConsole(true);
			}
		}
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const [MYOutput, setMYOutput] = useState("");

	console.log(output);
	useEffect(() => {
		if (output) {
			setMYOutput(output);
		}
	}, [output]);

	return (
		<>
			<div className="h-full w-full bg-[#353535]">
				<div className="flex h-full">
					<PanelGroup direction="horizontal">
						<Panel className=" bg-[#1e1e1e]" defaultSize={50}>
							<div className="flex-1 bg-[#1e1e1e] text-neutral-100"></div>
						</Panel>
						<PanelResizeHandle className="w-2 cursor-col-resize hover:bg-[#00FFF6]">
							<div className="h-full flex justify-center items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 2 14"
									width="2"
									height="14"
									fill="currentColor"
									className="text-gray-3 dark:text-dark-gray-3 transition -translate-y-6 group-hover:text-white dark:group-hover:text-white">
									<circle
										r="1"
										transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"></circle>
									<circle
										r="1"
										transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"></circle>
									<circle
										r="1"
										transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"></circle>
								</svg>
							</div>
						</PanelResizeHandle>
						{/* <div className="w-2 cursor-col-resize hover:bg-blue-600"></div> */}
						<Panel className="flex flex-col flex-1 min-h-screen max-h-[calc(100vh-40rem)]">
							<div className="flex flex-col h-[calc(100vh-3.5rem)]">
								<div className="py-2">
									<select
										onChange={onLanguageChangeHandler}
										className="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-[#1e1e1e] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
										{languagesOptions.map(
											(option, index) => {
												return (
													<option key={index}>
														{option}
													</option>
												);
											}
										)}
									</select>
								</div>
								<PanelGroup
									style={{ overflow: "visible" }}
									direction="vertical">
									<Panel
										style={{ overflow: "visible" }}
										defaultSize={50}>
										<div className={"h-full"}>
											<Editor
												theme={"vs-dark"}
												options={options}
												onChange={handleEditorChange}
												onMount={handleEditorDidMount}
												language={language.toLocaleLowerCase()}
												value={code}
												className=""
											/>
										</div>
									</Panel>
									{/* {showConsole && ( */}
									<>
										{showConsole && (
											<PanelResizeHandle className="w-full h-2 cursor-col-resize hover:bg-[#00FFF6]">
												<div className="h-full flex justify-center items-center">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 14 2"
														width="14"
														height="2"
														fill="currentColor"
														className="transition text-gray-3 dark:text-dark-gray-3 group-hover:text-white dark:group-hover:text-white">
														<circle
															r="1"
															transform="matrix(-1 0 0 1 1 1)"></circle>
														<circle
															r="1"
															transform="matrix(-1 0 0 1 7 1)"></circle>
														<circle
															r="1"
															transform="matrix(-1 0 0 1 13 1)"></circle>
													</svg>
												</div>
											</PanelResizeHandle>
										)}

										<Panel
											ref={panelRef}
											collapsible={true}
											// onCollapse={
											// 	() => setShowConsole(false)
											// }
											minSize={20}
											className=" bg-[#1e1e1e] text-cyan-50 flex flex-col gap-4 h-full">
											<div className=" bg-[#1e1e1e] text-cyan-50  flex flex-col gap-4 h-full">
												<Tab.Group>
													<Tab.List>
														<div className="flex gap-4 p-2 w-full border-b-[1px] border-neutral-700 py-2">
															<div>
																<Tab
																	className={({
																		selected,
																	}) =>
																		classNames(
																			"w-full",
																			"ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
																			selected
																				? "border-b border-blue-500 shadow"
																				: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
																		)
																	}>
																	Testcase
																</Tab>
															</div>
															<div>
																<Tab
																	className={({
																		selected,
																	}) =>
																		classNames(
																			"w-full",
																			"ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
																			selected
																				? "border-b border-blue-500 shadow"
																				: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
																		)
																	}>
																	Result
																</Tab>
															</div>
														</div>
													</Tab.List>
													<Tab.Panels>
														<Tab.Panel>
															<div className="flex w-full gap-4 p-2">
																<div className="flex flex-col flex-1">
																	<label htmlFor="input">
																		User
																		input
																	</label>
																	<textarea
																		name="args"
																		placeholder="User input"
																		className=" text-gray-100 bg-gray-200 w-full h-36 xl:h-44 dark:bg-neutral-800 focus:outline-none rounded-sm p-3 md:p-4 my-3"
																		id="args"></textarea>
																</div>
																<div className="flex flex-col flex-1">
																	<label htmlFor="input">
																		CLI
																		Arguments
																	</label>
																	<textarea
																		name="args"
																		placeholder="CLI Arguments"
																		className=" text-gray-100 bg-gray-200 w-full h-36 xl:h-44 dark:bg-neutral-800 focus:outline-none rounded-sm p-3 md:p-4 my-3"
																		id="args"></textarea>
																</div>
															</div>
														</Tab.Panel>
														<Tab.Panel>
															<div className="p-2">
																<h3 className="border-b-[1px] border-neutral-700">
																	Output
																	<p>
																		{
																			MYOutput
																		}
																	</p>
																</h3>
																<div
																	style={{
																		whiteSpace:
																			"pre-wrap",
																	}}
																	className="text-green-600 h-1/2">
																	{output.length >
																	0
																		? output
																		: ""}
																</div>
																<h3 className="border-b-[1px] border-neutral-700">
																	Errors
																</h3>
																<div className="text-red-500">
																	{consoleError.length >
																	0
																		? consoleError
																		: ""}
																</div>
															</div>
														</Tab.Panel>
													</Tab.Panels>
												</Tab.Group>
											</div>
										</Panel>
									</>
									{/* )} */}
								</PanelGroup>
								<div className="h-16 bg-[#1e1e1e] min-w-full border-t-[1px] border-neutral-800 p-2 px-4 flex items-center justify-between ">
									<button
										onClick={handlePanelOpen}
										className="bg-[#353535] px-4 py-2 flex items-center gap-1 text-neutral-50 rounded-md">
										<div>console</div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											className={`w-5 h-5 transition-transform ${
												showConsole ? "rotate-180" : ""
											}`}>
											<path
												fillRule="evenodd"
												d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
									<div className="flex items-center gap-3">
										<button
											className="bg-[#353535] px-6 py-2 text-neutral-50 rounded-md"
											onClick={handleCodeRun}>
											Run
										</button>
										<button
											className="bg-[#7DCE13] px-6 py-2 text-neutral-800 rounded-md font-semibold"
											onClick={handleCodeSubmit}>
											Submit
										</button>
									</div>
								</div>
							</div>
						</Panel>
					</PanelGroup>
				</div>
			</div>
		</>
	);
};

export default CodeEditor;
