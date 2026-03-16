/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export', // Esto genera la carpeta /out
  basePath: '/invitacion-ella-isabel', // Esto hace que la app se sirva desde /invitacion-ella-isabel
};

export default nextConfig;
