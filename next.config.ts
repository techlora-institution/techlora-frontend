import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js blocks image-optimizer requests to localhost/127.0.0.1 by
    // default (SSRF protection) even when remotePatterns matches it.
    // Needed for local dev against the Django dev server; harmless in
    // production since Cloudinary URLs aren't local IPs anyway.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // Local Django dev server media
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/**" },
      // Cloudinary (production media host)
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
