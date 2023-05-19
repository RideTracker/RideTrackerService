import { defineConfig } from "vite";

export default defineConfig({
    test: {
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', '.wrangler', '.github']
    },
    define: {
      'import.meta.vitest': false
    }
});
