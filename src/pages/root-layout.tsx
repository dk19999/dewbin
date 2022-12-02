import Layout from "../components/layout/index";
import Header from "../components/header/header";
import { ReactNode } from "react";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <Header>{}</Header>
      {children}
    </Layout>
  );
}

export default RootLayout;
