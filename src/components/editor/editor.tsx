import { Text } from '@codemirror/state'
import React, { useCallback, useContext } from 'react'
import PasteContext, { IPasteContextState } from '../../contexts/paste'
import useCodeMirror from '../../hooks/use-codemirror'
import styles from './editor.module.css'
const Editor = (props: { editable?: boolean, initialDoc: string | undefined }) => {
  const { initialDoc } = props
  const pasteContextValue = useContext(PasteContext)
  const handleChange = useCallback(
    (state: { doc: Text }) => {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      const pasteBody = state?.doc?.toString()
      pasteContextValue?.setPasteState((state: IPasteContextState) => ({ ...state, body: pasteBody }))
      console.log(
        '🚀 ~ file: editor.jsx ~ line 14 ~ Editor ~ state?.doc?.toString()',
        pasteBody
      )
    },

    [pasteContextValue?.setPasteState]
  )
  const [refContainer] = useCodeMirror<HTMLDivElement>({
    initialDoc,
    onChange: handleChange,
    editable: props.editable ?? true
  })
  return <div className={styles.editor} ref={refContainer}></div>
}

export default Editor
