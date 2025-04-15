import { defineConfig } from "vite";
import { redwood } from "@redwoodjs/sdk/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import Inspect from "vite-plugin-inspect";

export default defineConfig({
  clearScreen: false,
  plugins: [tailwindcss(), redwood(), Inspect()],

  environments: {
    worker: {
      resolve: {
        conditions: ["worker", "workerd"],
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/app"),
    },
  },
});
