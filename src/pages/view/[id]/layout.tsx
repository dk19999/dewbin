import Layout from "../../../components/layout/index";
import Header from "../../../components/header/header";
import { ReactNode, useContext, useRef } from "react";
import PasteContext from "../../../contexts/paste";
import styles from "./layout.module.css";
import LanguagesDropdown from "../../../components/language-dropdown/language-dropdown";
function LayoutWithQuery({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pasteContextValue = useContext(PasteContext);
  const { pasteState } = pasteContextValue ?? {};
  return (
    <Layout>
      <Header>
        <LanguagesDropdown />

        <a
          href=""
          ref={ref}
          download="code.txt"
          className={styles?.["download-btn"]}
          onClick={function () {
            if (ref.current)
              ref.current.href =
                "data:text/plain;charset=utf-11," +
                encodeURIComponent(pasteState?.body || "");
          }}
        >
          Download
        </a>
      </Header>
      {children}
    </Layout>
  );
}

export default LayoutWithQuery;