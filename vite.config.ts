import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
 
  plugins: [react(),
    tailwindcss(),
  ],

  base: '/typespeed/',
=======
  base: "/typespeed/",
  plugins: [react(),
    tailwindcss(),
  ],
>>>>>>> 7a93d5b2cb6df4dd08887471a7f45cb59a6445c0
 
})
