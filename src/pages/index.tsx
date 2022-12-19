import React, { ReactElement } from 'react'
import Editor from '../components/editor/editor'
import RootLayout from './root-layout'

const Home = () => {
  return (
    <div>
      <Editor editable initialDoc={''} />
    </div>
  )
}

export default Home

Home.getLayout = function getLayout (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}
