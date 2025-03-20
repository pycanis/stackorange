import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	integrations: [react()],
	vite: {
		plugins: [nodePolyfills({ include: ["buffer"] }), tailwindcss()],
	},
	adapter: node({
		mode: "middleware",
	}),
});
