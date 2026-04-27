const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://3.128.186.118:5000/:path*',
      },
    ]
  }
};

export default nextConfig;