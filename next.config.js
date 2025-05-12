/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true
  },
  sassOptions: {
    includePaths: ["./src/styles"]
  }
};

module.exports = nextConfig;