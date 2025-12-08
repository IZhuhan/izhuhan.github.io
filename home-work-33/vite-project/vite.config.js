import {defineConfig} from "vite";
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: 'vite-gulp',
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  }
});