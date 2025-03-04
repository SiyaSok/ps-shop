/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Use remotePatterns for Next.js 13 and later
      {
        protocol: "https", // Usually https
        hostname: "thefoschini.vtexassets.com", // The domain of your images
        port: "", // Leave empty if no port specified
        pathname: "/**", // Match all paths
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
