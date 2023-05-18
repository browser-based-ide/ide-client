import { selectPeers, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import { useEffect } from "react";
import uuid4 from "uuid4";
import { networkService } from "../../services";
import Peer from "./peer.component";

const Audio = ({ roomId, userName }) => {
	const hmsActions = useHMSActions();

	const peers = useHMSStore(selectPeers);

	useEffect(() => {
		const joinRoom = async () => {
			// use room code to fetch auth token

			try {
				const authToken = await networkService.post<any>(
					"100ms/get-token",
					{
						userId: await uuid4(),
						roomId: "6423e6cda42edf3910cbdd84",
					}
				);

				await hmsActions.join({
					userName,
					authToken: authToken.token,
					settings: {
						isVideoMuted: true,
					},
				});
			} catch (error) {
				console.log(error);
			}
		};
		joinRoom();
	}, [hmsActions]);

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
