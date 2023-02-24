import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useState, useEffect } from "react";
import useCodeEditorState from "../../store/editor/code-runner";

const CodeEditor = () => {
  const options = {
    selectOnLineNumbers: true,
  };

  const [language, output, consoleError, updateCodeSnippet] =
    useCodeEditorState((state) => [
      state.language,
      state.output,
      state.consoleError,
      state.updateCodeSnippet,
    ]);
  // console.log(output)

  const [defaultValue, setDefaultValue] = useState("");

  const handleEditorChange = (
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ) => {
    console.log(value);
    if (value) {
      updateCodeSnippet(value);
    }
  };

  useEffect(() => {
    // console.log(language)

    if (language === "JavaScript") {
      setDefaultValue(`console.log('Hello World')`);
    } else if (language === "Python") {
      setDefaultValue(`print('Hello World')`);
    } else if (language === "Java") {
      setDefaultValue(`System.out.println("Hello World");`);
    } else if (language === "Cpp") {
      setDefaultValue(`#include <iostream>
    using namespace std;
    int main() {
    cout << "Hello World";
    return 0;
    }`);
    }
  }, [language]);

  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full">
          <div className="flex-1">
            <Editor
              theme="vs-dark"
              defaultLanguage={language}
              options={options}
              defaultValue='console.log("Hello World")'
              onChange={handleEditorChange}
              value={defaultValue}
            />
          </div>
          <div className=" bg-[#1e1e1e] text-cyan-50 p-2 flex-1 flex flex-col gap-4">
            <div className="flex w-full gap-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="input">USER INPUT</label>
                <input
                  type="text"
                  placeholder="input"
                  className="text-gray-900 p-2 bg-gray-200"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="input">CLI ARGUMENTS</label>
                <input
                  type="text"
                  placeholder="input"
                  className="text-gray-900 p-2 bg-gray-200"
                />
              </div>
            </div>
            <h3 className="border-b-[1px] border-neutral-700">Output</h3>
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className="text-green-600 h-1/2">
              {output.length > 0 ? output : ""}
            </div>
            <h3 className="border-b-[1px] border-neutral-700">Errors</h3>
            <div className="text-red-500">
              {consoleError.length > 0 ? consoleError : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
