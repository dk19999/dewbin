declare namespace globalThis {
  var mongoose: any;
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;

  export = Schema;
}