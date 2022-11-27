import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor'
import {useState} from "react"

const CodeEditor = () => {
    const options = {
        selectOnLineNumbers: true
      };
    const [language, setLanguage] = useState("python") 
    const [editorCode, setEditorCode] = useState<string>('')
    const handleEditorChange = (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => {
        console.log(value);
        if(value) {setEditorCode(value)}
    }
    const submitCode = () => {
        
    }
  return (
<>
    <Editor
    theme="vs-dark"
     height="90vh"
     defaultLanguage={language}
     options={options}
     defaultValue="// some comment"
     onChange={handleEditorChange}
   />
   <div>
    <button  onClick={submitCode} >Submit</button>
   </div>
   </>
  )
}

export default CodeEditor