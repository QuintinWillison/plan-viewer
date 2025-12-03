// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Load environment variables at module level.
// The third argument '' means "load all variables", not just those starting with VITE_.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],

    server: {
      watch: {
        // The "!" tells Vite "Do NOT ignore this path" (i.e., please watch it)
        ignored: [`!${env.MARKDOWN_PLANS_PATH}/**`]
      }
    }
  }
});
