import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement, useContext, useEffect } from 'react'
import Editor from '../../components/editor/editor'
import PasteContext from '../../contexts/paste'
import { useGetSinglePasteQuery } from '../../generated/client-graphql'
import { importLanguageByName } from '../../lib/language-data'
import RootLayout from '../root-layout'

function ClonePaste (props: { id: string }) {
  const pasteContextValue = useContext(PasteContext)
  const { pasteState, setPasteState } = pasteContextValue ?? {}
  const router = useRouter()
  const { data, isFetched } = useGetSinglePasteQuery({ input: props.id })

  if (isFetched && !data?.paste) {
    router.push('/404')
  }

  const getLanguageData = async (languageName: string) => {
    const result = await importLanguageByName(languageName)
    return result
  }

  useEffect(() => {
    (async () => {
      if (setPasteState) {
        if (pasteState && Object.keys(data?.paste ?? {}).length) {
          const { body, syntaxLanguage, title } = data?.paste ?? {}
          const newPasteState = { ...pasteState }

          if (body) {
            newPasteState.body = body
          }
          if (syntaxLanguage) {
            newPasteState.syntaxLanguage = syntaxLanguage
          }
          if (title) {
            newPasteState.title = title
          }

          if (syntaxLanguage) {
            const languageData = await getLanguageData(syntaxLanguage)

            newPasteState.selectedLanguageData = languageData
          }

          setPasteState(newPasteState)
        }
      }
    })()
  }, [data, setPasteState])

  return (
    <div>
      <Editor editable initialDoc={data?.paste?.body} />
    </div>
  )
}

export default ClonePaste

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { id } = context.query
  console.log('🚀 ~ file: [...id].tsx ~ line 17 ~ getServerSideProps ~ id', id)
  if (!id) {
    id = ''
  }
  return { props: { id } }
}

ClonePaste.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}
