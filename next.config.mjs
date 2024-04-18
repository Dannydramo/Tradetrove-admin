/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    eslint: {
        dirs: ['pages', 'utils'],
    },
};

export default nextConfig;
