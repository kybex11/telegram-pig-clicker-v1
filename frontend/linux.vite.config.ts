import preact from '@preact/preset-vite'
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [preact()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './key_unencrypted.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './cert.pem'))
    },
    port: 3000
  }
});
