import Head from 'next/head'
import React, { ReactElement, ReactNode } from 'react'
const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <>
      <Head>
        <title>Dewbin</title>
      </Head>
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
