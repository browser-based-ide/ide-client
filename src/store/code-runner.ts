import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { networkService } from "../services";
import sortedLanguages from "../app/shared/utils/supported-languages";

interface codeEditorState {
	output: string; // console log
	consoleError: string; // compiler errors
	netWorkError: string; // network like 404, 501
	loading: boolean;
	language: any;
	codeSnippet: string;
	runCodeSnippet: (codeSnippet: string, language: string) => void;
	updateCodeSnippet: (codeSnippet: string) => void;
	setLanguage: (language: any) => void;
}

interface codeRunnerResponseInterface {
	stdout: string; // console log
	error: string; // compiler errors
	stderr: string;
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
				language: "javascript",
				runCodeSnippet: async (
					codeSnippet: string,
					language: string
				) => {
					// const data = { codeSnippet, language };
					const currentLanguage =
						sortedLanguages[language.toLocaleLowerCase()];
					const data = {
						language: currentLanguage.language,
						executionMode: "file",
						executeFile: currentLanguage.fileName,
						// executeFile: `index.${
						// 	currentLanguage.fileExtension as string
						// }`,
						files: [
							{
								fileName: currentLanguage.fileName,
								// fileName: `index.${
								// 	currentLanguage.fileExtension as string
								// }`,
								sourceCode: codeSnippet,
							},
						],
						stdin: "",
						args: "",
					};
					const response: codeRunnerResponseInterface =
						await networkService.post(
							"http://localhost:3000/api/execute",
							data
						);
					console.log(response?.stdout);

					set((state) => ({
						output: response?.stdout,
						consoleError: response?.stderr || response?.error || "",
					}));
				},
				updateCodeSnippet: (codeSnippet: string) => {
					set((state) => ({ codeSnippet }));
				},
				setLanguage: (language: any) => {
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
