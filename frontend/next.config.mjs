const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://localhost:5000/:path*',
      },
    ]
  }
};

export default nextConfig;