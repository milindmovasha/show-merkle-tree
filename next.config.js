/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "build",
    env: {
        NEXT_PUBLIC_WEB3_API_URL: process.env.NEXT_PUBLIC_WEB3_API_URL,
    },
}

module.exports = nextConfig
