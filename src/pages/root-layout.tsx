import Layout from "../components/layout/index";
import Header from "../components/header/header";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import PasteContext from "../contexts/paste";
import { useCreatePasteMutation } from "../generated/client-graphql";
import OptionsModal from "../components/options-modal/modal";
import LanguagesDropdown from "../components/language-dropdown/language-dropdown";

function RootLayout({ children }: { children: ReactNode }) {
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
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

  const openModal = () => {
    setIsOptionModalOpen(true);
    //add dynamic import here
  };

  const toggleOptionsModal = () => {
    setIsOptionModalOpen(false);
  };

  const generateLink = () => {
    if (contextValue?.pasteState) {
      const { selectedLanguageData, link, ...pasteData } =
        contextValue.pasteState;
      if (!pasteData.body) {
        return setError("Body can't be empty");
      } else {
        setError("");
      }
      console.log(
        "🚀 ~ file: header.tsx ~ line 47 ~ Header ~ contextValue?.pasteState",
        pasteData
      );
      createPaste({ input: pasteData });
    }
  };

  return (
    <Layout>
      <Header>
        {isOptionModalOpen && <OptionsModal handleClose={toggleOptionsModal} />}
        <LanguagesDropdown />
        <button className="button" onClick={generateLink}>Generate link</button>
        <button onClick={openModal}>More options</button>
        <span className="error">{error}</span>
        {/* {userId === paste.createdBy ?<button>Edit</button>:null} */}
      </Header>
      {children}
    </Layout>
  );
}

export default RootLayout;
