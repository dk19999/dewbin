import React, { ReactElement } from 'react'
import Header from '../../components/header/header'
import Layout from '../../components/layout'
import { useGetRecentPastesQuery } from '../../generated/client-graphql'
import { formatTimeAgo } from '../../utils/format'
import styles from './public-pastes.module.css'

function PublicPastes () {
  const { data, isFetched } = useGetRecentPastesQuery({
  })

  if (isFetched && ((data?.recentPastes) == null)) {
    return <span>There are no pastes to see</span>
  }

  return (
    <div className={styles?.container}>
      <div className={styles?.content}>
        <table className={styles?.table}>
          <thead>
            <tr>
              <th>Name/Title</th>
              <th>Posted</th>
              <th>Syntax</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentPastes?.map((paste) => {
              return (
                <tr key={paste.link} className={styles?.['table-body-row']}>
                  <td>
                    <a href={`/view/${paste.link ?? '#'}`}>
                      {' '}
                      {
                      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                      paste.title || 'Untitled'
                      }
                    </a>
                  </td>
                  <td>{formatTimeAgo(paste.createdAt)}</td>
                  <td>{paste.syntaxLanguage}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PublicPastes

PublicPastes.getLayout = function getLayout (page: ReactElement) {
  return (
    <Layout>
      <Header>{null}</Header>
      {page}
    </Layout>
  )
}
