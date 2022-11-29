import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import axios from '../axios'

export type languagesOptions = 'Python' | 'JavaScript' | 'Cpp' | 'Java'
interface codeEditorState {
  output: string // console log
  consoleError: string //compiler errors
  netWorkError: string // network like 404, 501
  loading: boolean
  language: languagesOptions
  codeSnippet: string
  runCodeSnippet: (codeSnippet: string, language: string) => void
  updateCodeSnippet: (codeSnippet: string) => void
  setLanguage: (language: languagesOptions) => void
}

interface codeRunnerResponseInterface {
  data: {
    output: string // console log
    consoleError: string //compiler errors
  }
}

const useCodeEditorState = create<codeEditorState>()(
  devtools(
    persist(
      set => ({
        output: '',
        consoleError: '',
        netWorkError: '',
        loading: false,
        codeSnippet: '',
        language: 'Python',
        runCodeSnippet: async (codeSnippet: string, language: string) => {
          const data = { codeSnippet, language }
          const response: codeRunnerResponseInterface = await axios.post(
            '/code/run',
            data
          )
          console.log(response)

          set(state => ({
            output: response.data.output,
            consoleError: response.data.consoleError,
          }))
        },
        updateCodeSnippet: (codeSnippet: string) => {
          set(state => ({ codeSnippet: codeSnippet }))
        },
        setLanguage: (language: languagesOptions) => {
          set(state => ({ language: language }))
        },
      }),
      { name: 'codeEditor' }
    )
  )
)

export default useCodeEditorState
