import * as monaco from "monaco-editor";
import { useEffect } from "react";

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
					node.className = "text-white text-sm  h-6";
					node.innerHTML = `<div class="bg-red-900 px-2 w-full h-6 ">
					${userName}
  </div>
  <div class="bg-red-900 w-1 h-6">
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
			// iterate over cursors and draw them
			// editorRef.current.removeContentWidget();
			// editorRef.current.getC
			Object.keys(cursors).forEach((key) => {
				const { userName, cursorPosition } = cursors[key];
				const decorator =
					cursorDecorator !== null && userName in cursorDecorator
						? cursorDecorator[userName]?.decorator || []
						: [];
				drawCursor(userName, cursorPosition, decorator);
			});
		}
	}, [editorRef.current, cursors]);
};

export default useDrawCursor;
