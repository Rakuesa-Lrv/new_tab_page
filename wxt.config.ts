import { defineConfig } from 'wxt';

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  imports: false,
  manifest: {
    permissions: [
      'storage',
      'unlimitedStorage',
      'favicon'
    ],
  },
});
