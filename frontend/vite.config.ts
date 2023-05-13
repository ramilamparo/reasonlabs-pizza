import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "src/styles/main" as *;`,
			},
		},
	},
	plugins: [
		react(),
		checker({
			typescript: true,
		}),
	],
});
