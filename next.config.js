/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    connectionString: "mongodb+srv://admin:zs3NvhvETRqWue7e@encluster0.3ihrokd.mongodb.net/?retryWrites=true&w=majority",
    secret: '62646031-626b-47bb-b213-f614d9cf918f'
},
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
