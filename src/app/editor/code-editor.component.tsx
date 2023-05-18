import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import React, { useEffect, useRef, useState } from "react";
import useCodeEditorState, { languagesOptions } from "../../store/code-runner";
import { SocketActions } from "../shared/utils/socket.util";

import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from "react-resizable-panels";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../store";
import Audio from "../100ms/100ms.component";
import Navbar from "../shared/components/navbar.component";
import useDrawCursor from "../shared/hooks/use-drawCursor";
import useSocket from "../shared/hooks/use-socket.hook";
import CodeEditorConsole from "./code-editor-console.component";

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
		padding: {
			top: 10,
		},
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
	// const [showConsole, setShowConsole] = useState(true);
	// const panelRef = useRef<ImperativePanelHandle>(null);
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

	const languagesOptions = ["Python", "Javascript", "Cpp", "Java"];

	const onLanguageChangeHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		event.preventDefault();
		console.log("User Selected Value - ", event.target.value);
		setLanguage(event.target.value as languagesOptions);
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

	const [MYOutput, setMYOutput] = useState("");

	console.log(output);
	useEffect(() => {
		if (output) {
			setMYOutput(output);
		}
	}, [output]);

	// const handleCodeSubmit = () => {
	// 	runCodeSnippet(codeSnippet, language);
	// };

	// const handleCodeRun = () => {};

	// const handlePanelOpen = () => {
	// 	const panel = panelRef.current;
	// 	if (panel) {
	// 		if (showConsole) {
	// 			panel.collapse();
	// 			setShowConsole(false);
	// 		} else {
	// 			panel.expand();
	// 			setShowConsole(true);
	// 		}
	// 	}
	// };

	// function classNames(...classes) {
	// 	return classes.filter(Boolean).join(" ");
	// }

	const location = useLocation();

	const currentProblem = location.pathname.split("/")[2];

	if (!currentProblem) {
		return <Navigate to="404" />;
	}

	const problems = {
		"1": {
			title: "Two Sum",
			description:
				"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
			functionSignature:
				"function twoSum(nums: number[], target: number): number[]",
			functionDescription:
				"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
			exampleInput:
				"Input: nums = [2,7,11,15], target = 9\nOutput: [0,1].",
			exampleOutput:
				"Output: Because nums[0] + nums[1] == 9, we return [0, 1]",
			constraints: [
				"2 <= nums.length <= 10^3",
				"-10^9 <= nums[i] <= 10^9",
				"-10^9 <= target <= 10^9",
				"Only one valid answer exists.",
				"You may not use the same element twice.",
			],
		},
		"2": {
			title: "Calculator with Python",
			description:
				"You are tasked with building a simple calculator tool that can perform basic arithmetic operations. The tool should allow users to input two numbers and choose an operation (addition, multiplication, or division), and then display the result of the operation. Additionally, the tool should be able to handle input validation to prevent errors from occurring.",
			functionSignature:
				"function twoSum(nums: number[], target: number): number[]",
			functionDescription:
				"Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
			exampleInput: "Input: nums = [2,7,11,15], target = 9",
			exampleOutput:
				"Output: Because nums[0] + nums[1] == 9, we return [0, 1].",
			constraints: [
				"2 <= nums.length <= 10^3",
				"-10^9 <= nums[i] <= 10^9",
				"-10^9 <= target <= 10^9",
				"Only one valid answer exists.",
				"You may not use the same element twice.",
			],
		},
		"3": {
			title: "Reverse String",
			description:
				"Write a function that takes a string as input and returns the string reversed.",
			functionSignature: "function reverseString(s: string): string",
			functionDescription:
				"Given a string `s`, you need to reverse the string without using any extra space.",
			exampleInput: 'Input: s = "hello"',
			exampleOutput: 'Output: "olleh"',
			constraints: [
				"1 <= s.length <= 10^5",
				"s consists of printable ASCII characters.",
			],
		},
		"4": {
			title: "Palindrome Number",
			description:
				"Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
			functionSignature: "function isPalindrome(x: number): boolean",
			functionDescription:
				"Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise. The function should handle negative numbers as well.",
			exampleInput: "Input: x = 121",
			exampleOutput: "Output: true",
			constraints: ["-2^31 <= x <= 2^31 - 1"],
		},
	};

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
										{/* <div className="flex-1 bg-[#1e1e1e] text-white py-8 px-6">
											<h1 className="text-3xl font-bold">
												Calculator with Python
											</h1>
											<div className="mt-4 p-1  border-b-2 border-b-[#353535]">
												Problem Description
											</div>
											<div className="mt-2">
												<p>
													
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
														function calculate(num1:
														number, num2: number,
														operator: string):
														
														<br />
														{
															" // Function logic goes here"
														}
													</code>
												</pre>
												<p>
													The function should take in
													two numbers (num1 and num2)
													and an operator as input,
													and it should return a
													number representing the
													result of the arithmetic
													operation.
												</p>
											</div>
											<div className="mt-4 p-1  border-b-2 border-b-[#353535]">
												Example
											</div>
											<div className="mt-2">
											
												<p>
													<strong>Input:</strong>{" "}
													calculate(5, 3, '+')
												</p>
												<p>
													<strong>Output:</strong> 8
												</p>
											</div>
											<div className="mt-4 p-1  border-b-2 border-b-[#353535]">
												Constraints
											</div>
											<div className="mt-2">
											
												<ul className="list-disc pl-6">
													<li>
														The input numbers will
														be integers within the
														range [1, 1000].
													</li>
													<li>
														The operator will always
														be a valid arithmetic
														operator ('+', '-', '*',
														'/').
													</li>
												</ul>
											</div>
										</div> */}
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
												<select
													onChange={
														onLanguageChangeHandler
													}
													className="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-[#1e1e1e] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
													{languagesOptions.map(
														(option, index) => {
															return (
																<option
																	key={index}>
																	{option}
																</option>
															);
														}
													)}
												</select>
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
														<CodeEditorConsole
															output={MYOutput}
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
