/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Optimizely SaaS CMS media CDN
      { protocol: "https", hostname: "*.optimizely.com" },
      { protocol: "https", hostname: "*.episerver.net" },
      // Optimizely Content Delivery CDN (asset URLs look like these)
      { protocol: "https", hostname: "*.usercontent.com" },
    ],
  },
};

export default nextConfig;
