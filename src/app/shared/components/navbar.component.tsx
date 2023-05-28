import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./profile-dropdown.component";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	// const location = useLocation();
	// const [language, codeSnippet, runCodeSnippet, setLanguage] =
	// 	useCodeEditorState((state) => [
	// 		state.language,
	// 		state.codeSnippet,
	// 		state.runCodeSnippet,
	// 		state.setLanguage,
	// 	]);

	// const languagesOptions = ["Python", "Javascript", "Cpp", "Java"];
	// const onLanguageChangeHandler = (
	// 	event: React.ChangeEvent<HTMLSelectElement>
	// ) => {
	// 	event.preventDefault();
	// 	console.log("User Selected Value - ", event.target.value);
	// 	setLanguage(event.target.value as languagesOptions);
	// };

	// const handleCodeSubmit = () => {
	// 	runCodeSnippet(codeSnippet, language);
	// };

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleSessionInvite = () => {
		openModal();
	};

	const peers = useHMSStore(selectPeers);
	const names = ["asdf", "asdasdf", "oiry", "sdaf"];

	return (
		<nav className="h-14 py-4 px-6 flex justify-between bg-neutral-900 items-center text-gray-50">
			<Link to="/">
				<div className="font-mono text-2xl font-bold cyan-500 text-gray-900">
					<h1 className="text-[#7DCE13]">IDE</h1>
				</div>
			</Link>
			<div className="flex item-center">
				<div className="flex -space-x-4 w-40">
					{peers.map((peer, index) => {
						return (
							<img
								key={index}
								className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
								src={`https://source.boringavatars.com/beam/120/${peer?.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`}
								alt=""
							/>
						);
					})}

					<a
						className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
						href="#">
						+1
					</a>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex item-flex">
						<ProfileDropdown />
					</div>
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
									<Dialog.Panel className="w-full mt-48 h-96 max-w-lg transform overflow-hidden rounded-2xl bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all flex flex-col">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-neutral-50">
											Invite people to your session
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Lorem ipsum dolor sit amet
												consectetur adipisicing elit.
												Consequuntur similique ea
												commodi ipsa veritatis dolorum.
												Ea molestias blanditiis dolorem
												nostrum doloribus atque, maiores
												voluptatem inventore aperiam.
												Ipsa ea inventore iusto?
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
			{/* {location.pathname.startsWith("/editor") && (
				<div className="flex gap-4">
					<select
						onChange={onLanguageChangeHandler}
						className="px-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						{languagesOptions.map((option, index) => {
							return <option key={index}>{option}</option>;
						})}
					</select>

					<button
						onClick={handleCodeSubmit}
						className="bg-green-500 px-6 mr-2 text-gray-900 text-base font-bold">
						RUN
					</button>
				</div>
			)} */}
			{/* <div>
        <ul className='flex gap-4 justify-center items-center'>
          <li>Logout</li>
        </ul>
      </div> */}
		</nav>
	);
};

export default Navbar;
