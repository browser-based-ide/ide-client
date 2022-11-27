import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import axios from '../axios'

interface codeEditorState {
  output: string,
  runCodeSnippet: (codeSnippet: string) => void
}

// const useCodeEditorState = create<codeEditorState>()(
//   devtools(
//     persist(set => ({
//       output: '',
//       runCodeSnippet: async (codeSnippet: string) => {
//         const response = await axios.post('/run',)
//         set(state => ({ output: codeSnippet }))
//       },
//     }))
//   )
// )
