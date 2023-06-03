import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import sortedLanguages from "../app/shared/utils/supported-languages";
import { networkService } from "../services";

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
	setOutput: (output: string) => void;
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
					const currentLanguage =
						sortedLanguages[language.toLocaleLowerCase()];
					const data = {
						language: currentLanguage.language,
						executionMode: "file",
						executeFile: currentLanguage.fileName,
						files: [
							{
								fileName: currentLanguage.fileName,
								sourceCode: codeSnippet,
							},
						],
						stdin: "",
						args: "",
					};
					const response: codeRunnerResponseInterface =
						await networkService.post(
							`${process.env.REACT_APP_COMPILER_URL}/api/execute`,
							data
						);

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
				setOutput: (output: string) => {
					set((state) => ({ output }));
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
