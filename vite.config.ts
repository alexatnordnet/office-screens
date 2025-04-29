import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Custom plugin to copy config.json and .nojekyll during build
function copyFilesPlugin() {
  return {
    name: 'copy-files',
    buildStart() {
      // Make sure the config is copied at build start
      const configPath = resolve('./config.json');
      if (fs.existsSync(configPath)) {
        console.log('Found config.json in root, will copy during build');
      } else {
        console.warn('config.json not found in root directory');
      }
      
      // Check for .nojekyll file
      const nojekyllPath = resolve('./.nojekyll');
      if (fs.existsSync(nojekyllPath)) {
        console.log('Found .nojekyll in root, will copy during build');
      }
    },
    writeBundle() {
      // Copy the config.json to the dist directory
      try {
        const configContent = fs.readFileSync('./config.json', 'utf-8');
        fs.writeFileSync('./dist/config.json', configContent);
        console.log('Successfully copied config.json to dist directory');
        
        // Copy .nojekyll to dist directory
        if (fs.existsSync('./.nojekyll')) {
          fs.writeFileSync('./dist/.nojekyll', '');
          console.log('Successfully copied .nojekyll to dist directory');
        }
      } catch (error) {
        console.error('Failed to copy files:', error);
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyFilesPlugin()],
  // Set the base URL to your repository name for GitHub Pages
  base: '/office-screens/',
  build: {
    // Output directory for the build
    outDir: 'dist',
    // Generate sourcemaps for easier debugging
    sourcemap: true,
    // Add correct MIME types
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Ensure proper MIME types by adding file extensions
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      // Allow direct imports from the root config.json
      '@config': resolve(__dirname, './config.json'),
    }
  }
})