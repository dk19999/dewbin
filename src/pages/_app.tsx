import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import PasteContext, { pasteCtxDefaultValue } from "../contexts/paste";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
export default function App({ Component, pageProps }:AppProps) {
  const [pasteState, setPasteState] = useState(
    pasteCtxDefaultValue?.pasteState
  );


  return (
    <QueryClientProvider client={client}>
      <PasteContext.Provider value={{ pasteState, setPasteState }}>
      <Component {...pageProps} />
      </PasteContext.Provider>
    </QueryClientProvider>
  );
}
