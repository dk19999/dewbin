import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactNode, useState } from 'react'
import PasteContext, { pasteCtxDefaultValue } from '../contexts/paste'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '../components/layout'
import type { NextPage } from 'next'

const client = new QueryClient()

type GetLayout = (page: ReactNode) => ReactNode

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout
}

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>
}

export default function App ({ Component, pageProps }: MyAppProps) {
  const [pasteState, setPasteState] = useState(
    pasteCtxDefaultValue?.pasteState
  )
  const getLayout =
    Component.getLayout ??
    ((page: ReactNode) => {
      return <Layout>{page}</Layout>
    })

  return (
    <QueryClientProvider client={client}>
      <PasteContext.Provider value={{ pasteState, setPasteState }}>
        {getLayout(<Component {...pageProps} />)}
      </PasteContext.Provider>
    </QueryClientProvider>
  )
}
