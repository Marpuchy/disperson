import { fileURLToPath } from "node:url";

const backendUrl = (process.env.BACKEND_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");
const frontendRoot = fileURLToPath(new URL("./", import.meta.url));
const distDir = process.env.NEXT_DIST_DIR ?? ".next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir,
  turbopack: {
    root: frontendRoot
  },
  async rewrites() {
    return [
      { source: "/login", destination: `${backendUrl}/login` },
      { source: "/logout", destination: `${backendUrl}/logout` },
      { source: "/register", destination: `${backendUrl}/register` },
      { source: "/profile", destination: `${backendUrl}/profile` },
      { source: "/quiz/:path*", destination: `${backendUrl}/quiz/:path*` },
      { source: "/admin/:path*", destination: `${backendUrl}/admin/:path*` },
      { source: "/_wdt/:path*", destination: `${backendUrl}/_wdt/:path*` },
      { source: "/_profiler/:path*", destination: `${backendUrl}/_profiler/:path*` },
      { source: "/css/:path*", destination: `${backendUrl}/css/:path*` },
      { source: "/js/:path*", destination: `${backendUrl}/js/:path*` },
      { source: "/resources/:path*", destination: `${backendUrl}/resources/:path*` },
      { source: "/bundles/:path*", destination: `${backendUrl}/bundles/:path*` }
    ];
  }
};

export default nextConfig;
