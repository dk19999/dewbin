import React, { ReactElement, useContext, useEffect } from "react";
import { useGetSinglePasteQuery } from "../../../generated/client-graphql";
import PasteContext, { IPasteContextState } from "../../../contexts/paste";
import Editor from "../../../components/editor/editor";
import { importLanguageByName } from "../../../lib/language-data";
import LayoutWithQuery from "./layout";
import { GetServerSideProps } from "next";
function ViewPaste(props: { id: string }) {
  const pasteContextValue = useContext(PasteContext);
  const { pasteState, setPasteState } = pasteContextValue ?? {};
  const { data } = useGetSinglePasteQuery({ input: props.id });

  const getLanguageData = async (languageName: string) => {
    const result = await importLanguageByName(languageName);
    return result;
  };

  useEffect(() => {
    console.log("called again");
    (async () => {
      if (setPasteState) {
        if (pasteState && Object.keys(data?.paste || {}).length) {
          const { link, body, syntaxLanguage } = data?.paste || {};
          let newPasteState: IPasteContextState = { ...pasteState };

          if (body) {
            newPasteState["body"] = body;
          }
          if (syntaxLanguage) {
            newPasteState["syntaxLanguage"] = syntaxLanguage;
          }
          if (link) {
            newPasteState["link"] = link;
          }

          if (syntaxLanguage) {
            const languageData = await getLanguageData(syntaxLanguage);
            newPasteState["selectedLanguageData"] = languageData || [];
          }

          setPasteState(newPasteState);
        }
      }
    })();
  }, [data, setPasteState]);

  return (
    <div>
      <Editor editable={false} initialDoc={data?.paste?.body} />
    </div>
  );
}

export default ViewPaste;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { id } = context.query;
  // If slug is "undefined", since "undefined" cannot be serialized, server will throw error
  // But null can be serializable
  if (!id) {
    id = "";
  }
  // now we are passing the slug to the component
  return { props: { id: id } };
};

ViewPaste.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithQuery>{page}</LayoutWithQuery>;
};
