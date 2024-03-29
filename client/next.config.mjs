// @ts-check
export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "/**/**",
        },
      ],
    },
  };
  return nextConfig;
};
