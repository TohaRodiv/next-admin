const config = {
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.node = {
				fs: "empty"
			}
		}

		return config;
	},

	images: {
		domains: [],
	},
}


const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(config);