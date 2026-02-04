import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/",
        permanent: false,
      },
      {
        source: "/writing/one-player-vs-multiplayer-software",
        destination: "/thoughts/one-player-vs-multiplayer-software",
        permanent: true,
      },
      {
        source: "/writing/the-global-rules-based-order-is-dead",
        destination: "/thoughts/the-global-rules-based-order-is-dead",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
