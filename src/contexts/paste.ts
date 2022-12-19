import React, { Dispatch } from 'react'
import { Exposure } from '../generated/client-graphql'

export interface IPasteContextState {
  title: string
  body: string
  exposure: Exposure
  expiration: number
  syntaxLanguage: string
  link?: string
  selectedLanguageData?: any[]
}

export interface IPasteContext {
  pasteState: IPasteContextState
  setPasteState: Dispatch<React.SetStateAction<any>>
}

export const pasteCtxDefaultValue = {
  pasteState: {
    title: '',
    body: '',
    exposure: Exposure.Public,
    syntaxLanguage: 'None',
    expiration: 0,
    selectedLanguageData: [],
    link: ''
  },
  setPasteState: () => {}
}

const PasteContext = React.createContext<IPasteContext | null>(
  null
)

export default PasteContext
