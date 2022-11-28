import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor'
import { useState } from "react"

const CodeEditor = () => {
  const options = {
    selectOnLineNumbers: true
  };
  const [language, setLanguage] = useState("python")
  const [editorCode, setEditorCode] = useState<string>('')
  const handleEditorChange = (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => {
    console.log(value);
    if (value) { setEditorCode(value) }
  }
  const submitCode = () => {

  }
  return (
    <>
      <div className="flex flex-row h-full w-full">
        <div className="flex-1">

          <Editor
            theme="vs-dark"
            // height="80vh"
            defaultLanguage={language}
            options={options}
            defaultValue="// some comment"
            onChange={handleEditorChange}
          />
        </div>
        <div className="flex-1 bg-gray-800 text-cyan-50 p-2">Console</div>
      </div>
      {/* <div>
        <button onClick={submitCode} className="bg-green-500 px-4 py-3  rounded" >Submit</button>
      </div> */}
    </>
  )
}

export default CodeEditor