import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				}
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "assets": path.resolve(__dirname, 'src/assets'),
      "components": path.resolve(__dirname, 'src/components'),
      "apis": path.resolve(__dirname, 'src/apis'),
      "utils": path.resolve(__dirname, 'src/utils'),
      "styles": path.resolve(__dirname, 'src/styles')
    }
  },

  server: {
    open: true,
    host: "0.0.0.0",
    port: "3030",
    proxy: {
      '/api': {
        target: "https://c.m.163.com/",
        // ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
