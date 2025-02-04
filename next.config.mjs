/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.pokemon-card.com',
            }
        ]
    }
};

export default nextConfig;
