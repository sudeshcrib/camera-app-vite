import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 8080,
  },
  resolve: {
    dedupe: ["@augloop/runtime-client"],
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@augloop/runtime-client/dist/src/version.json",
          dest: "assets",
        },
      ],
    })],
})
