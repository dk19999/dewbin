import Layout from "../components/layout/index";
import Header from "../components/header/header";
import { ReactNode } from "react";
import LanguagesDropdown from "../components/language-dropdown/language-dropdown";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <Header>
      <LanguagesDropdown />
      </Header>
      {children}
    </Layout>
  );
}

export default RootLayout;
