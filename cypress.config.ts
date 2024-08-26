import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    port: 3000, // Set the desired port number here

  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
