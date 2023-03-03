import { SocketOptions } from "dgram";
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
}

interface SocketRef {
	current: Socket | null;
}

const useSocket = (
	sessionId: string,
	authUserName: string,
	editorRef: React.MutableRefObject<any>
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
			({ clients, userName, socketId }: JoinedPayload) => {
				// if (userName !== authUserName) {
				// 	console.log(`${userName} joined`);
				// }
				setCurrentUserJoined(clients);
				const currentCode = editorRef.current?.getValue();
				socketRef.current.emit(SocketActions.SYNC_CODE, {
					code: currentCode,
					socketId,
				});
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
			}
		);

		return () => {
			socketRef.current?.off(SocketActions.JOINED);
			socketRef.current?.off(SocketActions.DISCONNECTED);
			socketRef.current?.disconnect();
		};
	}, [authUserName, sessionId]);

	return { currentUserJoined, socketRef };
};

export default useSocket;
