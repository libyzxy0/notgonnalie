import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', 
      injectRegister: 'auto', 
      devOptions: {
        enabled: true
      }, 
      manifest: {
        name: "Not Gonna Lie",
        short_name: "NGL",
        description: "Send/Receive messages anonymously",
        icons: [
          {
            src: "/icons/icon.png", 
            sizes: "512x512",
            type: "image/png", 
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  server: {
      host: true
  }, 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }, 
  }
})
