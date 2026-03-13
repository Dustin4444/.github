/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    strict: true,
  },
  eslint: {
    dirs: ['app', 'components', 'lib'],
  },
}

module.exports = nextConfig
