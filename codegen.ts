const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schemas/server/**/*.graphql",
  generates: {
    "src/generated/server-graphql.ts": {
      // documents: "src/schemas/server/**/*.graphql",
      plugins: ["typescript", "typescript-operations", "typescript-resolvers"],
    },
    "src/generated/client-graphql.ts": {
      documents: "src/schemas/client/**/*.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          endpoint: process.env.NEXT_PUBLIC_SCHEMA_PATH,
          fetchParams: JSON.stringify({
            headers: {
              "Content-Type": "application/json",
            },
          }),
        },
      },
    },
  },
};

export default config;
