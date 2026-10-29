// GitHub Pages serves the site from /FizjoPage-NextJS, locally it runs at the root.
const basePath = process.env.GITHUB_ACTIONS ? "/FizjoPage-NextJS" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
};

module.exports = nextConfig;
