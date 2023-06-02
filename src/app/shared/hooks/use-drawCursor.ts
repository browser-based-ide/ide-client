import * as monaco from "monaco-editor";
import { useEffect } from "react";

const cursorColors = [
	"bg-red-700",
	"bg-blue-700",
	"bg-green-700",
	"bg-yellow-700",
	"bg-purple-700",
	"bg-pink-700",
	"bg-indigo-700",
	"bg-gray-700",
];

const cursorColor =
	cursorColors[Math.floor(Math.random() * cursorColors.length)];

const useDrawCursor = (
	editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>,
	cursorPosition,
	cursors,
	setCursorDecorator,
	cursorDecorator
) => {
	// draw cursor
	useEffect(() => {
		const drawCursor = (userName: string, cursorPosition, decorator) => {
			const contentWidgetOptions = {
				allowEditorOverflow: true,
				suppressMouseDown: false,
				getPosition: () => ({
					position: cursorPosition,
					preference: [
						monaco.editor.ContentWidgetPositionPreference.ABOVE,
					],
				}),
			};
			const previousContentWidget = document.getElementById(userName);
			if (previousContentWidget) {
				previousContentWidget.remove();
			}

			const contentWidget = {
				getId: () => userName,
				getDomNode: () => {
					const node = document.createElement("div");
					node.id = userName;
					node.className = "text-white text-sm h-6";
					node.innerHTML = `<div class="${cursorColor} px-2 w-full h-6 rounded-md rounded-bl-none flex items-center justify-center ">
					${userName}
  </div>
  <div class="${cursorColor} w-[2px] h-6 animate-blink">
  </div>`;
					return node;
				},
				...contentWidgetOptions,
			};

			// Not working
			const newDecorator = editorRef.current?.deltaDecorations(
				decorator,
				[
					{
						range: new monaco.Range(
							cursorPosition.lineNumber,
							cursorPosition.column,
							cursorPosition.lineNumber,
							cursorPosition.column
						),
						options: {
							isWholeLine: false,
							className: "bg-blue-900",
						},
					},
				]
			);

			setCursorDecorator((prev) => ({
				...prev,
				[userName]: {
					decorator: newDecorator,
				},
			}));

			editorRef.current?.addContentWidget(contentWidget);
		};

		if (cursorPosition !== null && cursors !== null) {
			Object.keys(cursors).forEach((key) => {
				const { userName, cursorPosition } = cursors[key];
				const decorator =
					cursorDecorator !== null && userName in cursorDecorator
						? cursorDecorator[userName]?.decorator || []
						: [];
				drawCursor(userName, cursorPosition, decorator);
			});
		}
	}, [
		cursorPosition,
		cursors,
		editorRef,
		setCursorDecorator,
		cursorDecorator,
	]);
};

export default useDrawCursor;
