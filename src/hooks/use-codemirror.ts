import { useContext, useEffect, useRef } from "react";
import { EditorState, StateEffect } from "@codemirror/state";
import { EditorView, highlightActiveLine, lineNumbers } from "@codemirror/view";
import { history } from "@codemirror/commands";
import { indentOnInput } from "@codemirror/language";
import PasteContext from "../contexts/paste";

export const transparentTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent !important",
    height: "100%",
  },
});

interface Props {
  initialDoc: string | undefined;
  onChange: (state: EditorState) => void;
  editable: boolean;
}

const useCodeMirror = <T extends Element>(props: Props) => {
  const refContainer = useRef<T>(null);
  const pasteContextValue = useContext(PasteContext);
  const pasteState = pasteContextValue?.pasteState;
  const { onChange, editable: isEditorEditable } = props;

  let editor = useRef<EditorView | null>(null);
  useEffect(() => {
    if (props.initialDoc === undefined || !refContainer.current) {
      return;
    }

    const extensions = [
      history(),
      indentOnInput(),
      lineNumbers(),
      ...(!pasteState?.selectedLanguageData
        ? []
        : pasteState.selectedLanguageData),
      /* Making the background transparent. */
      transparentTheme,
      highlightActiveLine(),
      EditorView.updateListener.of((update) => {
        if (update.changes) {
          onChange && onChange(update.state);
        }
      }),
      EditorView.editable.of(isEditorEditable),
      EditorView.lineWrapping,
    ];
    if (!editor.current) {
      const newEditorView = new EditorView({
        state: EditorState.create({
          doc: props.initialDoc,
          extensions,
        }),
        parent: refContainer.current,
      });
      editor.current = newEditorView;
    } else {
      editor?.current?.dispatch({
        effects: StateEffect.reconfigure.of(extensions),
      });
    }
  }, [
    refContainer,
    editor,
    pasteState?.selectedLanguageData,
    props.initialDoc,
  ]);

  return [refContainer];
};

export default useCodeMirror;
