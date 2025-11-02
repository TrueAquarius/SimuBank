import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // This option allows you to opt-out specific packages from being bundled
  // in the Server Components layer. This is necessary for libraries like 'odbc'
  // that have native Node.js addons and are not compatible with bundling.
  serverExternalPackages: ['odbc'],
};

export default nextConfig;
