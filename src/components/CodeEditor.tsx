import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useState } from 'react'
import useCodeEditorState from '../store/codeRunner'

const CodeEditor = () => {
  const options = {
    selectOnLineNumbers: true,
  }

  const [output, consoleError, updateCodeSnippet] = useCodeEditorState(
    state => [state.output, state.consoleError, state.updateCodeSnippet]
  )
  console.log(output)
  const [language, setLanguage] = useState<string>('python')

  const handleEditorChange = (
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ) => {
    console.log(value)
    if (value) {
      updateCodeSnippet(value)
    }
  }

  return (
    <>
      <div className='flex flex-row h-full w-full'>
        <div className='flex-1'>
          <Editor
            theme='vs-dark'
            // height="80vh"
            defaultLanguage={language}
            options={options}
            defaultValue='print("hello world")'
            onChange={handleEditorChange}
          />
        </div>
        <div className='flex-1 bg-gray-800 text-cyan-50 p-2'>
          <h2>Console</h2>
          <h3>Output</h3>
          <div style={{ whiteSpace: "pre-wrap" }} >{output.length > 0 ? output : ''}</div>
          <h3>Errors</h3>
          <div>{consoleError.length > 0 ? consoleError : ''}</div>
        </div>
      </div>
    </>
  )
}

export default CodeEditor
