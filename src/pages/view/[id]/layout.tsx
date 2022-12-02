import Layout from "../../../components/layout/index";
import Header from "../../../components/header/header";
import { ReactNode } from "react";
import LanguagesDropdown from "../../../components/language-dropdown/language-dropdown";
function LayoutWithQuery({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <Header>
        <LanguagesDropdown />

        {/* {userId === paste.createdBy ?<button>Edit</button>:null} */}
      </Header>
      {children}
    </Layout>
  );
}

export default LayoutWithQuery;
