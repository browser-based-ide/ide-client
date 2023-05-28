import { selectPeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { useEffect } from "react";
import { networkService } from "../../services";
import Peer from "./peer.component";

const Audio = ({ roomId, userName }) => {
	const hmsActions = useHMSActions();

	const peers = useHMSStore(selectPeers);

	useEffect(() => {
		const joinRoom = async () => {
			try {
				const roomData = await networkService.post<any>(
					"100ms/create-room",
					{
						sessionID: roomId,
						userID: userName,
					}
				);

				console.log(roomData.token.appToken);

				await hmsActions.join({
					userName,
					authToken: roomData.token.appToken,
					settings: {
						isVideoMuted: true,
					},
				});
			} catch (error) {
				console.log(error);
			}
		};
		joinRoom();
	}, [hmsActions, roomId, userName]);

	useEffect(() => {
		window.onunload = () => {
			hmsActions.leave();
		};
	}, [hmsActions]);

	return (
		<div className="flex items-start gap-2">
			{peers.map((peer) => (
				<Peer key={peer.id} peer={peer} />
			))}
		</div>
	);
};

export default Audio;
