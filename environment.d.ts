declare namespace globalThis {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_MONGODB_URI: string; // this is the line you want
        NODE_ENV: 'development' | 'production';
        PORT?: string;
      }
    }
  }
  
  