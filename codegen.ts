import type { CodegenConfig } from '@graphql-codegen/cli'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/schemas/server/**/*.graphql',
  generates: {
    'src/generated/server-graphql.ts': {
      // documents: "src/schemas/server/**/*.graphql",
      plugins: ['typescript', 'typescript-operations', 'typescript-resolvers']
    },
    'src/generated/client-graphql.ts': {
      documents: 'src/schemas/client/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query'
      ],
      config: {
        fetcher: {
          endpoint: process.env.NEXT_PUBLIC_SCHEMA_PATH,
          fetchParams: JSON.stringify({
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
      }
    }
  }
}

export default config
