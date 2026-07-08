// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Load environment variables at module level.
// The third argument '' means "load all variables", not just those starting with VITE_.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  markdown: {
    // Emit both a light and a dark Shiki theme for fenced code blocks. The dark
    // theme stays the on-screen default (defaultColor: 'dark' keeps its colours
    // in the plain color and background-color properties, so on-screen rendering
    // is unchanged). The light theme is exposed as --shiki-light and
    // --shiki-light-bg CSS variables that the print stylesheet swaps in, see
    // src/styles/global.css.
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: 'dark'
    }
  },
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
