/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
  },

  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "res.cloudinary.com",
  //       port: "",
  //       pathname: "/**/**",
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
