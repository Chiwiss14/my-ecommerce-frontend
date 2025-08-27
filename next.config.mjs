/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com"],
  },

  experimental: {
    optimizeCss: false, // force Next.js + Tailwind to use PostCSS instead of LightningCSS
  },
};

export default nextConfig;
