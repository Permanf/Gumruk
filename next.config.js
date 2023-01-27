/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "back.terminal.gov.tm"],
  },
};
module.exports = nextConfig;
// http://localhost:3000/profile/tickets/declaration/(http://95.85.127.198/storage/images/6398c8367d0fd/6398c8367d101.webp)
