import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "object-src 'none'",
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  process.env.NODE_ENV === "development"
    ? "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*"
    : "connect-src 'self'",
  process.env.NODE_ENV === "development"
  ? "connect-src 'self' https://vlmizleoxlpzzvnktppy.supabase.co wss://vlmizleoxlpzzvnktppy.supabase.co http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*"
  : "connect-src 'self' https://vlmizleoxlpzzvnktppy.supabase.co wss://vlmizleoxlpzzvnktppy.supabase.co",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(self)",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
