import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import { useState, useEffect } from "react";
import useCodeEditorState from "../../store/editor/code-runner";

// loader.config({ monaco });

const CodeEditor = () => {
	const options = {
		minimap: {
			enabled: false,
		},

		fontSize: 18,
		// fontFamily: "JetBrains Mono",
		fontFamily: "IBM Plex Mono",
		acceptSuggestionOnCommitCharacter: true,
		// "autoIndent": false,
		automaticLayout: true,
		codeLens: true,
		colorDecorators: true,
		contextmenu: true,
		cursorSmoothCaretAnimation: false,
		disableLayerHinting: false,
		disableMonospaceOptimizations: false,
		dragAndDrop: false,
		fixedOverflowWidgets: false,
		folding: true,
		fontLigatures: false,
		formatOnPaste: false,
		formatOnType: false,
		hideCursorInOverviewRuler: false,
		highlightActiveIndentGuide: true,
		links: true,
		mouseWheelZoom: false,
		multiCursorMergeOverlapping: true,
		overviewRulerBorder: true,
		overviewRulerLanes: 2,
		quickSuggestions: true,
		quickSuggestionsDelay: 100,
		readOnly: false,
		renderControlCharacters: false,
		renderFinalNewline: true,
		renderIndentGuides: true,
		// "renderLineHighlight": "all",
		revealHorizontalRightPadding: 30,
		roundedSelection: true,
		rulers: [],
		scrollBeyondLastColumn: 5,
		scrollBeyondLastLine: true,
		selectOnLineNumbers: true,
		selectionClipboard: true,
		selectionHighlight: true,
		smoothScrolling: false,
		suggestOnTriggerCharacters: true,
		wordBasedSuggestions: true,
		wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
		wordWrapBreakAfterCharacters: "\t})]?|&,;",
		wordWrapBreakBeforeCharacters: "{([+",
		wordWrapBreakObtrusiveCharacters: ".",
		wordWrapColumn: 80,
		wordWrapMinified: true,
	};

	const [language, output, consoleError, updateCodeSnippet] =
		useCodeEditorState((state) => [
			state.language,
			state.output,
			state.consoleError,
			state.updateCodeSnippet,
		]);
	// console.log(output)

	const [defaultValue, setDefaultValue] = useState("");

	const handleEditorChange = (
		value: string | undefined,
		event: monaco.editor.IModelContentChangedEvent
	) => {
		console.log(value);
		if (value) {
			updateCodeSnippet(value);
		}
	};

	useEffect(() => {
		// console.log(language)

		if (language === "Javascript") {
			setDefaultValue(`console.log('Hello World')`);
		} else if (language === "Python") {
			setDefaultValue(`print('Hello World')`);
		} else if (language === "Java") {
			setDefaultValue(`System.out.println("Hello World");`);
		} else if (language === "Cpp") {
			setDefaultValue(`#include <iostream>
    using namespace std;
    int main() {
    cout << "Hello World";
    return 0;
    }`);
		}
	}, [language]);

	return (
		<>
			<div className="h-full w-full">
				<div className="flex h-full">
					<div className="flex-1">
						<Editor
							theme={"vs-dark"}
							defaultLanguage={"python"} // "javascript"
							options={options}
							defaultValue={`print('Hello World')`}
							onChange={handleEditorChange}
							value={defaultValue}
						/>
						{/* <Editor
							theme="vs-dark"
							defaultLanguage={language}
							options={options}
							defaultValue={defaultValue}
							onChange={handleEditorChange}
							value={defaultValue}
						/> */}
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
