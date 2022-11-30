import "../styles/globals.css";
import { useState } from "react";
import PasteContext, { pasteCtxDefaultValue } from "../contexts/paste";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [pasteState, setPasteState] = useState(
    pasteCtxDefaultValue?.pasteState
  );

  return (
    <PasteContext.Provider value={{ pasteState, setPasteState }}>
      <Component {...pageProps} />
    </PasteContext.Provider>
  );
}
