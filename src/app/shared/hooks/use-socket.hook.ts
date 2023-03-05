import { SocketOptions } from "dgram";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { io, ManagerOptions, Socket } from "socket.io-client";
import { SocketActions } from "../utils/socket.util";

interface Client {
	socketId: string;
	userName: string;
}


interface JoinedPayload {
	clients: Client[];
	userName: string;
	socketId: string;
	cursorPositionsForSessionId: {
		[key: string]: {
			userName: string;
			cursorPosition: { lineNumber: number; column: number };
		};
	};
}

interface SocketRef {
	current: Socket | null;
}

const useSocket = (
	sessionId: string,
	authUserName: string,
	editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>,
	setCursors: React.Dispatch<
		React.SetStateAction<{
			[key: string]: {
				userName: string;
				cursorPosition: {
					lineNumber: number;
					column: number;
				};
			};
		}>
	>,
	setCode: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
	const [currentUserJoined, setCurrentUserJoined] = useState<Client[]>([]);
	const socketRef: SocketRef = useRef(null);

	useEffect(() => {
		const options: Partial<ManagerOptions & SocketOptions> = {
			reconnectionAttempts: 9999999,
			timeout: 10000,
			transports: ["websocket"],
			reconnection: true,
		};

		socketRef.current = io("http://localhost:4000/", options);
		socketRef.current.on("connect_error", (err: Error) =>
			handleErrors(err)
		);
		socketRef.current.on("connect_failed", (err: Error) =>
			handleErrors(err)
		);

		function handleErrors(e: Error) {
			console.log("socket error", e);
		}

		socketRef.current.emit(SocketActions.JOIN, {
			sessionId,
			userName: authUserName,
		});

		// Listening for joined event
		socketRef.current.on(
			SocketActions.JOINED,
			({
				clients,
				userName,
				socketId,
				cursorPositionsForSessionId, //	<--- can be used after
			}: JoinedPayload) => {
				setCurrentUserJoined(clients);
				console.log(
					"cursorPositionsForSessionId",
					cursorPositionsForSessionId
				);

				// sync cursors
				setCursors(cursorPositionsForSessionId);
				console.log("cursorPositionsForSessionId", cursorPositionsForSessionId);

				
				

				const currentCode = editorRef.current?.getValue();
				socketRef.current.emit(SocketActions.SYNC_CODE, {
					code: currentCode,
					socketId,
				});
			}
		);

		socketRef.current?.on(SocketActions.CODE_CHANGED, ({ code }) => {
			if (code !== null && code !== undefined) {
				if (editorRef.current) {
					const selectionRange = editorRef.current.getSelection();
					const model = editorRef.current.getModel();
					const fullRange = new monaco.Range(
						1,
						1,
						model.getLineCount(),
						model.getLineMaxColumn(model.getLineCount())
					);
					// replace the selected text with a new value
					model.pushEditOperations(
						[],
						[
							{
								range: fullRange,
								text: code.toString(),
								forceMoveMarkers: true,
							},
						],
						() => null
					);
					editorRef.current.setSelection(selectionRange);
				} else {
					setCode(code);
				}
			}
		});

		socketRef.current?.on(
			SocketActions.CURSOR_POSITION_CHANGED,
			({ cursorPosition, userName }) => {
				if (cursorPosition !== null && cursorPosition !== undefined) {
					setCursors((prev) => {
						return {
							...prev,
							[userName]: {
								userName,
								cursorPosition,
								decorator:
									cursorPosition[userName]?.decorator || [],
							},
						};
					});
				}
			}
		);

		// Listening for disconnected
		socketRef.current.on(
			SocketActions.DISCONNECTED,
			({ socketId, userName }) => {
				setCurrentUserJoined((prev) => {
					return prev.filter(
						(client) => client.socketId !== socketId
					);
				});

				// setCursors((prev) => {
				// 	const keys = Object.keys(prev).filter(
				// 		(key) => key !== userName
				// 	);
				// 	return keys.reduce((obj, key) => {
				// 		obj[key] = prev[key];
				// 		return obj;
				// 	}, {});
				// });
				const previousContentWidget = document.getElementById(userName);
				if (previousContentWidget) {
					previousContentWidget.remove();
				}
			}
		);

		return () => {
			socketRef.current?.off(SocketActions.JOINED);
			socketRef.current?.off(SocketActions.CODE_CHANGED);
			socketRef.current?.off(SocketActions.CURSOR_POSITION_CHANGED);
			socketRef.current?.off(SocketActions.DISCONNECTED);
			socketRef.current?.disconnect();
		};
	}, [authUserName, sessionId]);

	return { currentUserJoined, socketRef };
};

export default useSocket;
