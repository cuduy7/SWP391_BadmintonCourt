/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    VIEW_MAP: process.env.VIEW_MAP,
    CHECK_MAP: process.env.CHECK_MAP,
  },
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com", "api.vietqr.io", "vietqr.net"],
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
};

module.exports = nextConfig;
