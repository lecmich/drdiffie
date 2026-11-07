import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

// Der Projektname in package.json bestimmt den Pfad: https://dev.lecmich.it/<name>/
const { name } = JSON.parse(readFileSync("./package.json", "utf8")) as { name: string };

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${name}`,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
