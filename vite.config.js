import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' 
    ? '/marina-kovaleva-js2/' 
    : '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});