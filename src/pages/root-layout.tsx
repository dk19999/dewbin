import Layout from "../components/layout/index";
import Header from "../components/header/header";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import PasteContext from "../contexts/paste";
import { useCreatePasteMutation } from "../generated/client-graphql";
import LanguagesDropdown from "../components/language-dropdown/language-dropdown";

function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const contextValue = useContext(PasteContext);
  const [error, setError] = useState("");
  const {
    mutate: createPaste,
    isSuccess,
    data,
    reset,
  } = useCreatePasteMutation({});

  if (data?.pasteCreate && isSuccess) {
    router.push(`/view/${data.pasteCreate?.link}`);
    reset();
  }
  const generateLink = () => {
    if (contextValue?.pasteState) {
      const { selectedLanguageData, link, ...pasteData } =
        contextValue.pasteState;
      if (!pasteData.body) {
        return setError("Body can't be empty");
      } else {
        setError("");
      }
      
      createPaste({ input: pasteData });
    }
  };

  return (
    <Layout>
      <Header>
        <LanguagesDropdown />
        <button className="button" onClick={generateLink}>Generate link</button>
        <span className="error">{error}</span>
        {/* {userId === paste.createdBy ?<button>Edit</button>:null} */}
      </Header>
      {children}
    </Layout>
  );
}

export default RootLayout;
