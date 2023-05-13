import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { networkService } from "../services";

export type languagesOptions = "Javascript" | "Python" | "Cpp" | "Java";
interface codeEditorState {
	output: string; // console log
	consoleError: string; // compiler errors
	netWorkError: string; // network like 404, 501
	loading: boolean;
	language: languagesOptions;
	codeSnippet: string;
	runCodeSnippet: (codeSnippet: string, language: string) => void;
	updateCodeSnippet: (codeSnippet: string) => void;
	setLanguage: (language: languagesOptions) => void;
}

interface codeRunnerResponseInterface {
	output: string; // console log
	consoleError: string; // compiler errors
}

const useCodeEditorState = create<codeEditorState>()(
	devtools(
		persist(
			(set) => ({
				output: "",
				consoleError: "",
				netWorkError: "",
				loading: false,
				codeSnippet: "",
				language: "Python",
				runCodeSnippet: async (
					codeSnippet: string,
					language: string
				) => {
					const data = { codeSnippet, language };
					const response: codeRunnerResponseInterface =
						await networkService.post(
							"http://localhost:4200/api/code/run",
							data
						);
					console.log(response);

					set((state) => ({
						output: response?.output,
						consoleError: response?.consoleError,
					}));
				},
				updateCodeSnippet: (codeSnippet: string) => {
					set((state) => ({ codeSnippet }));
				},
				setLanguage: (language: languagesOptions) => {
					set((state) => ({ language }));
				},
			}),
			{
				name: "auth", // unique name
				getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
			}
		)
	)
);

export default useCodeEditorState;
