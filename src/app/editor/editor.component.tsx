import Navbar from "../shared/components/navbar.component";
import CodeEditor from "./code-editor.component";

const Home = () => {
	const languages = [
		"JavaScript",
		"Python",
		"Java",
		"C++",
		"C",
		"PHP",
		"Ruby",
	];

	return (
		<>
			<Navbar />
			<div className="flex min-h-screen fixed w-full">
				<div className="w-full">
					<div className="flex justify-between h-full items-center ">
						<CodeEditor />
					</div>
				</div>
			</div>
			{/* Header */}
		</>
	);
};

const Header = () => {
	const languages = ["JavaScript", "Python", "Java", "C++", "C", "PHP"];
	return (
		<div className="w-full h-16 flex flex-shrink-0 items-center justify-between px-4 lg:px-6 border-b border-gray-200 dark:border-gray-800">
			<a href="/" className="flex items-center cursor-pointer">
				<h1 className="text-lg font-bold">EDITOR</h1>
			</a>

			<div className="flex items-center gap-3 md:gap-5">
				<button
					className="w-9 h-8 hidden md:flex items-center justify-center focus:outline-none rounded-md"
					id="orientation">
					<i className="fas fa-columns"></i>
				</button>

				<div className="relative px-2.5 py-1 bg-white dark:bg-gray-800 border dark:border-gray-800 border-gray-200 rounded-md dropdown-menu-icon">
					<div className="w-full h-full flex items-center justify-center cursor-pointer">
						<span
							className="text-sm"
							id="language"
							data-language="{{language}}">
							JavaScript
						</span>
						{/* <!-- Heroicon name: solid/chevron-down --> */}
						<svg
							className="-mr-1.5 ml-2 h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					{/* <!-- Dropdown menu container --> */}
					<div className="hidden origin-top-right absolute mt-5 py-1 w-44 rounded-md shadow-md bg-white dark:bg-gray-800 top-6 right-0 z-10 select-none border dark:border-transparent border-gray-100 dropdown-menu-container">
						{/* <!-- Dropdown menus --> */}
						<div
							className="w-full max-h-80 divide-y divide-gray-100 dark:divide-gray-700 text-left overflow-y-auto"
							id="languages">
							{languages.map((language, index) => {
								return (
									<a
										className="block px-5 py-2.5"
										key={index}
										href="/compiler?lang={{this.language}}">
										{language}
									</a>
								);
							})}
						</div>
						{/* //  Close dropdown menus */}
						<div
							className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 z-0 close-dropdown-menu"
							style={{ zIndex: -1 }}></div>
					</div>
				</div>

				<button
					className="w-9 h-8 flex items-center justify-center bg-blue-600 focus:outline-none text-white rounded-md border border-blue-600"
					id="execute">
					<span className="execute-icon">
						<i className="fas fa-play fa-sm"></i>
					</span>
					<span className="hidden loading-icon">
						<i className="fa fa-cog fa-sm animate-spin-slow"></i>
					</span>
				</button>

				<div className="relative px-1 py-1 dropdown-menu-icon">
					<div className="w-full h-full flex items-center justify-center cursor-pointer">
						<i className="fas fa-ellipsis-v fa-md"></i>
					</div>
					{/* <!-- Dropdown menu container --> */}
					<div className="hidden origin-top-right absolute mt-5 py-1 w-40 rounded-md shadow-md bg-white dark:bg-gray-800 top-6 right-0 z-10 select-none border dark:border-transparent border-gray-100 dropdown-menu-container">
						{/* <!-- Dropdown menus --> */}
						<div className="w-full max-h-80 divide-y divide-gray-100 dark:divide-gray-700 text-left overflow-y-auto">
							<div className="px-4 py-2.5 cursor-pointer">
								<a className="block w-full h-full download">
									<i className="fas fa-download fa-sm mr-2"></i>{" "}
									Download
								</a>
							</div>
							<div className="px-4 py-2.5 cursor-pointer">
								<a className="block w-full h-full theme">
									<i className="fa fa-moon fa-sm theme-icon mr-2"></i>{" "}
									Theme
								</a>
							</div>
						</div>
						<div
							className="w-full h-screen fixed top-0 left-0 bottom-0 right-0 z-0 close-dropdown-menu"
							style={{
								zIndex: -1,
							}}></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
