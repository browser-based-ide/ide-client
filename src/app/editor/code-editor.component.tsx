import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../store";
import useCodeEditorState from "../../store/code-runner";
import Audio from "../100ms/100ms.component";
import Navbar from "../shared/components/navbar.component";
import { problems } from "../shared/config";
import useDrawCursor from "../shared/hooks/use-drawCursor";
import useSocket from "../shared/hooks/use-socket.hook";
import { getEmailInitial } from "../shared/utils/helper.util";
import { SocketActions } from "../shared/utils/socket.util";
import supportedLanguages from "../shared/utils/supported-languages";
import CodeEditorConsole from "./code-editor-console.component";

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
		padding: {
			top: 10,
		},
		cursorBlinking: "solid",
		fixedOverflowWidgets: true,
	};

	const authUserName = useAuthStore((state) =>
		getEmailInitial(state?.user.firstName)
	);
	// TODO remove dependency on zustand store
	const [
		language,
		output,
		consoleError,
		codeSnippet,
		setLanguage,
		runCodeSnippet,
		setOutput,
	] = useCodeEditorState((state) => [
		state.language,
		state.output,
		state.consoleError,
		state.codeSnippet,
		state.setLanguage,
		state.runCodeSnippet,
		state.setOutput,
	]);

	const [code, setCode] = useState(supportedLanguages[language].defaultCode);
	const { sessionId } = useParams();
	const editorRef = useRef(null);
	const [cursorDecorator, setCursorDecorator] = useState<{
		[key: string]: { decorator: string[] };
	}>(null);
	const [cursors, setCursors] = useState<{
		[key: string]: {
			userName: string;
			cursorPosition: { lineNumber: number; column: number };
		};
	}>(null);

	const [showConsole, setShowConsole] = useState(true);
	const panelRef = useRef<ImperativePanelHandle>(null);

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
		const defaultCode = supportedLanguages[language].defaultCode;
		setCode(defaultCode);
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
			setCode(value);
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

	const onLanguageChangeHandler = (value) => {
		setLanguage(value);
		setOutput("");
	};

	const handleCodeSubmit = () => {
		runCodeSnippet(code, language);
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

	const location = useLocation();

	const currentProblem = location.pathname.split("/")[2];

	if (!currentProblem) {
		return <Navigate to="404" />;
	}

	return (
		<>
			<Navbar />

			<div className="flex min-h-screen fixed w-full">
				<div className="w-full">
					<div className="flex justify-between h-full items-center ">
						<div className="h-full w-full bg-[#353535]">
							<div className="flex h-full">
								<PanelGroup direction="horizontal">
									<Panel
										className=" bg-[#1e1e1e]"
										defaultSize={45}>
										{
											<div className="flex-1 bg-[#1e1e1e] text-white py-8 px-6">
												<h1 className="text-3xl font-bold">
													{
														problems[currentProblem]
															.title
													}
												</h1>
												<div className="mt-4 p-1  border-b-2 border-b-[#353535]">
													Problem Description
												</div>
												<div className="mt-2">
													<p>
														{
															problems[
																currentProblem
															].description
														}
													</p>
												</div>
												<div className="mt-4 p-1  border-b-2 border-b-[#353535]">
													Function Signature
												</div>
												<div className="mt-2">
													<p>
														Implement the following
														function:
													</p>
													<pre className=" bg-[#353535] rounded p-2 text-sm mt-2 mb-2">
														<code>
															{
																problems[
																	currentProblem
																]
																	.functionSignature
															}
															<br />
															{
																" // Function logic goes here"
															}
														</code>
													</pre>
													<p>
														{
															problems[
																currentProblem
															]
																.functionDescription
														}
													</p>
												</div>
												<div className="mt-4 p-1  border-b-2 border-b-[#353535]">
													Example
												</div>
												<div className="mt-2">
													<p>
														{
															problems[
																currentProblem
															].exampleInput
														}
													</p>
													<p>
														{
															problems[
																currentProblem
															].exampleOutput
														}
													</p>
												</div>
												<div className="mt-4 p-1  border-b-2 border-b-[#353535]">
													Constraints
												</div>
												<div className="mt-2">
													<ul className="list-disc pl-6">
														{problems[
															currentProblem
														].constraints.map(
															(
																constraint,
																index
															) => (
																<li key={index}>
																	{constraint}
																</li>
															)
														)}
													</ul>
												</div>
											</div>
										}
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

									<Panel className="flex flex-col flex-1 min-h-screen max-h-[calc(100vh-40rem)]">
										<div className="flex flex-col h-[calc(100vh-3.5rem)]">
											<div className="py-2 flex justify-between items-center">
												<Listbox
													value={language}
													onChange={
														onLanguageChangeHandler
													}>
													{({ open }) => (
														<>
															<div className="relative mt-2">
																<Listbox.Button className="relative w-40 cursor-default rounded-md bg-dark py-2 pl-3 pr-10 text-left text-white shadow-sm sm:text-sm sm:leading-6 dark:text-white">
																	<span className="flex items-center">
																		<span className="ml-3 block truncate">
																			{
																				supportedLanguages[
																					language
																				]
																					.languageName
																			}
																		</span>
																	</span>
																	<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			fill="none"
																			viewBox="0 0 24 24"
																			strokeWidth={
																				1.5
																			}
																			stroke="currentColor"
																			className="h-5 w-5 text-gray-400"
																			aria-hidden="true">
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
																			/>
																		</svg>
																	</span>
																</Listbox.Button>

																<Transition
																	show={open}
																	as={
																		Fragment
																	}
																	leave="transition ease-in duration-100"
																	leaveFrom="opacity-100"
																	leaveTo="opacity-0">
																	<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-40 overflow-auto rounded-md bg-dark  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
																		{Object.values(
																			supportedLanguages
																		).map(
																			(
																				language
																			) => (
																				<Listbox.Option
																					key={
																						language.language
																					}
																					className={({
																						active,
																					}) =>
																						classNames(
																							active
																								? "bg-[#137DCE] text-white"
																								: "text-white",
																							"relative cursor-default select-none py-2 pl-3 pr-9"
																						)
																					}
																					value={
																						language.language
																					}>
																					{({
																						selected,
																						active,
																					}) => (
																						<>
																							<div className="flex items-center">
																								<span
																									className={classNames(
																										selected
																											? "font-semibold"
																											: "font-normal",
																										"ml-3 block truncate"
																									)}>
																									{
																										language.languageName
																									}
																								</span>
																							</div>

																							{selected ? (
																								<span
																									className={classNames(
																										active
																											? "text-white"
																											: "text-[#137DCE]",
																										"absolute inset-y-0 right-0 flex items-center pr-4"
																									)}>
																									<svg
																										xmlns="http://www.w3.org/2000/svg"
																										fill="none"
																										viewBox="0 0 24 24"
																										strokeWidth={
																											1.5
																										}
																										stroke="currentColor"
																										aria-hidden="true"
																										className="w-5 h-5">
																										<path
																											strokeLinecap="round"
																											strokeLinejoin="round"
																											d="M4.5 12.75l6 6 9-13.5"
																										/>
																									</svg>
																								</span>
																							) : null}
																						</>
																					)}
																				</Listbox.Option>
																			)
																		)}
																	</Listbox.Options>
																</Transition>
															</div>
														</>
													)}
												</Listbox>
												<Audio
													roomId={sessionId}
													userName={authUserName}
												/>
											</div>
											<PanelGroup direction="vertical">
												<Panel defaultSize={70}>
													<div className={"h-full"}>
														<Editor
															theme={"vs-dark"}
															options={options}
															onChange={
																handleEditorChange
															}
															onMount={
																handleEditorDidMount
															}
															language={language}
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
														minSize={20}
														className=" bg-[#1e1e1e] text-cyan-50 flex flex-col gap-4 h-full">
														<CodeEditorConsole
															output={output}
															consoleError={
																consoleError
															}
														/>
													</Panel>
												</>
												{/* )} */}
											</PanelGroup>
											<div className="h-16 bg-[#1e1e1e] min-w-full border-t-[1px] border-neutral-800 p-2 px-4 pr-6 flex items-center justify-between ">
												<button
													onClick={handlePanelOpen}
													className="bg-[#353535] px-4 py-2 flex items-center gap-1 text-neutral-50 rounded-md">
													<div>console</div>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														className={`w-5 h-5 transition-transform ${
															showConsole
																? "rotate-180"
																: ""
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
														onClick={
															handleCodeSubmit
														}>
														Submit
													</button>
												</div>
											</div>
										</div>
									</Panel>
								</PanelGroup>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CodeEditor;
