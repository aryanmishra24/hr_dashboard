/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dummyjson.com', 'api.dicebear.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig; 