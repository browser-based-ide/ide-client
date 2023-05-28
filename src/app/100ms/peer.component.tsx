import { useAVToggle, useHMSActions, useVideo } from "@100mslive/react-sdk";
import { useNavigate } from "react-router-dom";

function Peer({ peer }) {
	const { videoRef } = useVideo({
		trackId: peer.videoTrack,
	});

	const {
		isLocalAudioEnabled,
		isLocalVideoEnabled,
		toggleAudio,
		toggleVideo,
	} = useAVToggle();


	const hmsActions = useHMSActions();
	const navigate = useNavigate();
	const handleLeave = async () => {
		await hmsActions.leave();
		navigate("/dashboard");
	};

	
	return (
		<div className="peer-container">
			<video
				ref={videoRef}
				className="w-0 h-0"
				autoPlay
				muted
				playsInline
			/>
			{/* <div className="peer-name">
				{peer.name} {peer.isLocal ? "(You)" : ""}
			</div> */}
			{peer.isLocal && (
				<div className="flex items-center gap-2 pr-4">
					<button onClick={toggleAudio}>
						{isLocalAudioEnabled ? (
							<div className="bg-green-500 p-2 rounded-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
									/>
								</svg>
							</div>
						) : (
							<div className="bg-red-500 p-2 rounded-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="white"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
									/>
								</svg>
							</div>
						)}
					</button>

					<button onClick={handleLeave}>
						<div className="bg-red-500 p-2 rounded-md">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="white"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
								/>
							</svg>
						</div>
					</button>
				</div>
			)}
		</div>
	);
}

export default Peer;
