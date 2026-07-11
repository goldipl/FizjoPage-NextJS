/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/FizjoPage-NextJS",
  assetPrefix: "/FizjoPage-NextJS/",
};

module.exports = nextConfig;