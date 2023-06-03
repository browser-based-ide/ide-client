import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./profile-dropdown.component";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [haveMorePeer, setHaveMorePeer] = useState(0);
	const [peerList, setPeerList] = useState([]);
	const peers = useHMSStore(selectPeers);

	function closeModal() {
		navigator.clipboard.writeText(window.location.href);
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleSessionInvite = () => {
		openModal();
	};

	useEffect(() => {
		const newPeerList = [];
		for (let index = 0; index < peers.length; index++) {
			if (index >= 3) {
				setHaveMorePeer((prevHaveMorePeer) => {
					return peers.length - index;
				});
				break;
			}
			const peer = peers[index];
			newPeerList.push(
				<img
					key={index}
					className="w-10 h-10 border-2 border-none rounded-full "
					src={`https://source.boringavatars.com/beam/120/${peer?.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
					alt=""
				/>
			);
		}
		setPeerList(newPeerList);
	}, [peers]);

	return (
		<nav className="h-14 py-4 px-6 flex justify-between bg-neutral-900 items-center text-gray-50">
			<Link to="/dashboard">
				<div className="font-mono text-2xl font-bold cyan-500 text-gray-900">
					<h1 className="text-[#7DCE13]">IDE</h1>
				</div>
			</Link>
			<div className="flex item-center">
				<div className="flex -space-x-4 w-40">
					{peerList.map((peer, index) => (
						<div key={index}>{peer}</div>
					))}

					{haveMorePeer > 0 && (
						<a
							className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-none rounded-full"
							href="#">
							+{haveMorePeer}
						</a>
					)}
				</div>
				<div className="flex items-center gap-4">
					<button
						className="bg-[#137DCE] px-4 py-2 text-neutral-50 rounded-md font-medium flex items-center gap-2"
						onClick={handleSessionInvite}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="w-5 h-5">
							<path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
						</svg>

						<div>Invite</div>
					</button>
					<div className="flex item-flex">
						<ProfileDropdown />
					</div>
				</div>
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-10"
						onClose={closeModal}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<div className="fixed inset-0 bg-black bg-opacity-50" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex min-h-full items-start justify-center p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95">
									<Dialog.Panel className="w-full mt-48 h-70 max-w-lg transform overflow-hidden rounded-2xl bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all flex flex-col">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-neutral-50">
											Invite people to your session
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Share this link to invite people
												to your session and start
												collaborating. Anyone with this
												link will be able to join your
												session.
											</p>
										</div>

										<div className="mt-4">
											<button
												type="button"
												className="bg-[#353535] px-6 py-2 text-neutral-50 rounded-md"
												onClick={closeModal}>
												Copy link
											</button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</div>
		</nav>
	);
};

export default Navbar;
