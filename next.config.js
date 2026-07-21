/** @type {import('next').NextConfig} */

// GitHub Actions sets GITHUB_ACTIONS=true during CI builds — use that to
// detect "we're building for GitHub Pages" vs. local dev/build.
const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export", // static export — required for GitHub Pages

  // Only prefix paths when actually deploying to GitHub Pages.
  // Locally, the site stays at http://localhost:3000/ with no prefix.
  basePath: isGithubPages ? "/shuttle-booking" : "",
  assetPrefix: isGithubPages ? "/shuttle-booking/" : "",

  images: {
    unoptimized: true, // next/image's optimizer needs a server; GH Pages has none
  },

  trailingSlash: true, // avoids 404s on GH Pages for nested routes like /book
};

module.exports = nextConfig;