import { Tab } from "@headlessui/react";
import { useEffect, useRef } from "react";
import useCodeEditorState from "../../store/code-runner";

interface Props {
	output: string;
	consoleError: string;
}

const CodeEditorConsole: React.FC<Props> = ({ output, consoleError }) => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	const language = useCodeEditorState((state) => state.language);

	const iFrameRef = useRef(null);

	useEffect(() => {
		if (language === "html") {
			iFrameRef.current.style.display = "block";
			iFrameRef.current.style.backgroundColor = "white";
			iFrameRef.current.style.height = "100vh";
			// give margin bottom
			iFrameRef.current.style.paddingBottom = "30%";
			iFrameRef.current.style.width = "100%";
			const iframeDocument = iFrameRef.current.contentDocument;
			iframeDocument.open();
			iframeDocument.write(output);
			iframeDocument.close();
		}
	}, [output, language]);

	return (
		<div className=" bg-[#1e1e1e] text-cyan-50  flex flex-col gap-4 h-full">
			<Tab.Group>
				<Tab.List>
					<div className="flex gap-4 w-full border-b-[1px] border-neutral-700 ">
						<div>
							<Tab
								className={({ selected }) =>
									classNames(
										"w-full",
										"ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2 p-2 px-6",
										selected
											? "border-b-2 border-green-500 text-green-500 active:border-none focus:ring-0 focus:shadow-none focus:ring-offset-0"
											: " hover:border-b-2 hover:border-white hover:text-white"
									)
								}>
								Result
							</Tab>
						</div>
						<div>
							<Tab
								className={({ selected }) =>
									classNames(
										"w-full",
										"ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2 p-2 px-6",
										selected
											? "border-b-2 border-green-500 text-green-500 active:border-none focus:ring-0 focus:shadow-none focus:ring-offset-0"
											: " hover:border-b-2 hover:border-white hover:text-white"
									)
								}>
								Testcase
							</Tab>
						</div>
					</div>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>
						{language !== "html" && (
							<div className="p-2">
								<h3 className="border-b-[1px] border-neutral-700">
									Output
								</h3>
								<div
									style={{
										whiteSpace: "pre-wrap",
									}}
									className="text-green-600 h-1/2">
									{output}
								</div>
								<h3 className="border-b-[1px] border-neutral-700">
									Errors
								</h3>
								<div className="text-red-500">
									{consoleError.length > 0
										? consoleError
										: ""}
								</div>
							</div>
						)}
						{language === "html" && (
							<iframe
								className="w-full h-full hidden"
								ref={iFrameRef}></iframe>
						)}
					</Tab.Panel>
					<Tab.Panel>
						<div className="flex w-full gap-4 p-2">
							<div className="flex flex-col flex-1">
								<label htmlFor="input">User input</label>
								<textarea
									name="args"
									placeholder="User input"
									className=" text-gray-100 bg-gray-200 w-full h-36 xl:h-44 dark:bg-neutral-800 focus:outline-none rounded-sm p-3 md:p-4 my-3"
									id="args"></textarea>
							</div>
							<div className="flex flex-col flex-1">
								<label htmlFor="input">CLI Arguments</label>
								<textarea
									name="args"
									placeholder="CLI Arguments"
									className=" text-gray-100 bg-gray-200 w-full h-36 xl:h-44 dark:bg-neutral-800 focus:outline-none rounded-sm p-3 md:p-4 my-3"
									id="args"></textarea>
							</div>
						</div>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default CodeEditorConsole;
