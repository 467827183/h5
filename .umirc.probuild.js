import { defineConfig } from "umi";

export default defineConfig({
  define: {
    "process.env": {
      SUBG_API: "https://api.tideswap.io/v1",
    },
  },
});
