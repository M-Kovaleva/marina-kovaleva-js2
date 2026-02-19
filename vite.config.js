import { defineConfig } from 'vite';

export default defineConfig({
  // ✅ Условный base: пустой для dev, с путем для production
  base: process.env.NODE_ENV === 'production' 
    ? '/marina-kovaleva-js2/' 
    : '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});