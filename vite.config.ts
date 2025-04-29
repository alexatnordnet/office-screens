import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Custom plugin to copy config.json during build
function copyConfigPlugin() {
  return {
    name: 'copy-config',
    buildStart() {
      // Make sure the config is copied at build start
      const configPath = resolve('./config.json');
      if (fs.existsSync(configPath)) {
        console.log('Found config.json in root, will copy during build');
      } else {
        console.warn('config.json not found in root directory');
      }
    },
    writeBundle() {
      // Copy the config.json to the dist directory
      try {
        const configContent = fs.readFileSync('./config.json', 'utf-8');
        fs.writeFileSync('./dist/config.json', configContent);
        console.log('Successfully copied config.json to dist directory');
      } catch (error) {
        console.error('Failed to copy config.json:', error);
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyConfigPlugin()],
  // Set the base URL to your repository name for GitHub Pages
  base: '/office-screens/',
  build: {
    // Output directory for the build
    outDir: 'dist',
    // Generate sourcemaps for easier debugging
    sourcemap: true,
  },
  resolve: {
    alias: {
      // Allow direct imports from the root config.json
      '@config': resolve(__dirname, './config.json'),
    }
  }
})