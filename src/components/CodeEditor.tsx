import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useState, useEffect } from 'react'
import useCodeEditorState from '../store/codeRunner'

const CodeEditor = () => {
  const options = {
    selectOnLineNumbers: true,
  }

  const [language, output, consoleError, updateCodeSnippet] = useCodeEditorState(
    state => [state.language, state.output, state.consoleError, state.updateCodeSnippet]
  )
  // console.log(output)

  const [defaultValue, setDefaultValue] = useState('')




  const handleEditorChange = (
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent
  ) => {
    console.log(value)
    if (value) {
      updateCodeSnippet(value)
    }
  }

  useEffect(() => {
    // console.log(language)

    if (language === 'JavaScript') {
      setDefaultValue(`console.log('Hello World')`)
    } else if (language === 'Python') {
      setDefaultValue(`print('Hello World')`)
    } else if (language === 'Java') {
      setDefaultValue(`System.out.println("Hello World");`)
    }
    else if (language === 'Cpp') {
      setDefaultValue(`#include <iostream>
    using namespace std;
    int main() {
    cout << "Hello World";
    return 0;
    }`)

    }

  }, [language])




  return (
    <>
      <div className='flex flex-column h-full w-full'>
        <div className='flex-1 bg-gray-800 text-gray-100 p-5'>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi illo reiciendis quae. Quo, a animi! Minima quasi nostrum a eum totam, cum rem, aperiam ut reiciendis culpa, quidem voluptatem doloribus!
        </div>
        <div className='flex flex-col flex-1'>

          <div className='h-2/4'>
            <Editor
              theme='vs-dark'
              // height="80vh"
              defaultLanguage={language}
              options={options}
              defaultValue='console.log("Hello World")'
              onChange={handleEditorChange}
              value={defaultValue}
            />
          </div>
          <div className='flex-1 bg-gray-900 text-cyan-50 p-2'>
            {/* <h2>CONSOLE</h2> */}
            <div className='flex flex-col'>

              <label htmlFor="input">Custom input</label>
              <input type="text" className='text-gray-900 p-2 bg-gray-200' />
            </div>
            <h3 className='border-b-2 border-gray-800'>Output</h3>
            <div style={{ whiteSpace: 'pre-wrap' }} className="text-green-600">
              {output.length > 0 ? output : ''}
            </div>
            <h3 className='border-b-2 border-gray-800'>Errors</h3>
            <div className='text-red-500'>{consoleError.length > 0 ? consoleError : ''}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CodeEditor
