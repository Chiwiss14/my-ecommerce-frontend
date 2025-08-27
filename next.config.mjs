/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com"],
  },

  experimental: {
    optimizeCss: false, // Disable LightningCSS optimization
  },
};

export default nextConfig;
