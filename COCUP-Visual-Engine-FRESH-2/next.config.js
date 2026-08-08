/** @type {import('next').NextConfig} */
const nextConfig = {
  // sharp'ın native binary'lerini ve public/assets altındaki dosyaları
  // Vercel'in serverless fonksiyon paketine dahil edildiğinden emin olur.
  outputFileTracingIncludes: {
    "/api/render": ["./public/assets/**/*"]
  }
};

module.exports = nextConfig;
