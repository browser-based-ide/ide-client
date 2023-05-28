import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ProfileDropdown() {
	const navigate = useNavigate();
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="w-10 h-10 inline-flex justify-center gap-x-1.5 rounded-full text-sm font-semibold shadow-sm ">
					<div>
						<img
							src="https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
							alt="Avatar"
							className="border-2 border-none rounded-full"
						/>
					</div>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-dark bg-[#353535] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active
											? " text-white bg-dark"
											: "text-neutral-50 ",
										"block px-4 py-2 text-sm"
									)}>
									Account settings
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active
											? " text-white bg-dark"
											: "text-neutral-50",
										"block px-4 py-2 text-sm"
									)}>
									Support
								</a>
							)}
						</Menu.Item>
						{/* <Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active
											? " text-white"
											: "text-neutral-50",
										"block px-4 py-2 text-sm"
									)}>
									License
								</a>
							)}
						</Menu.Item> */}
						<form method="POST" action="#">
							<Menu.Item>
								{({ active }) => (
									<button
										type="button"
										onClick={() => {
											navigate("/logout");
										}}
										className={classNames(
											active
												? " text-white bg-dark"
												: "text-neutral-50",
											"block w-full px-4 py-2 text-left text-sm"
										)}>
										Sign out
									</button>
								)}
							</Menu.Item>
						</form>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
