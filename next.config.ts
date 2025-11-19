const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "imagekit.io", protocol: "https" },
      { hostname: "ik.imagekit.io", protocol: "https" },
      { hostname: "images.unsplash.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
