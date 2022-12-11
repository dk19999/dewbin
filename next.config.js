/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  webpack: (config) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: ['webpack-graphql-loader'],
    });
    return config
  }
}

module.exports = nextConfig
