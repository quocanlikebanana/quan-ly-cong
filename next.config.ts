import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

export default nextConfig;


// experimental: {
// 	esmExternals: "loose", // Fix for MongoDB bson parser
// 	serverComponentsExternalPackages: ["mongoose"] // External package handling
// },
// // Enable top-level await support for Webpack
// webpack: (config) => {
// 	config.experiments = {
// 		topLevelAwait: true,
// 		layers: true,
// 	};
// 	return config;
// },