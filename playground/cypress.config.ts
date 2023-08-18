import { devServer } from "@cypress/vite-dev-server";
import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: "vue",
      });
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
