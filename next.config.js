/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.simplyrecipes.com',
        port: '',
        pathname: '/thmb/**',
      },
    ],
  },

  // SVGR + Disable webpack cache
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    // Disable webpack cache in production
    if (!dev) {
      config.cache = false;
    }

    return config;
  },
};

module.exports = nextConfig;
