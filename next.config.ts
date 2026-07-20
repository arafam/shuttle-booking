import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,


  output: "export", // static export — required for GitHub Pages
 
  // GitHub Pages serves this repo at /shuttle-booking/, not the domain root,
  // so every internal link and asset needs that prefix baked in.
  basePath: "/shuttle-booking",
  assetPrefix: "/shuttle-booking/",
 
  images: {
    unoptimized: true, // next/image's optimizer needs a server; GH Pages has none
  },
 
  trailingSlash: true, // avoids 404s on GH Pages for nested routes like /book


};

export default nextConfig;
