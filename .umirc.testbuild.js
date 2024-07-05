import { defineConfig } from "umi";

export default defineConfig({
  define: {
    "process.env": {
      SUBG_API: "https://test-api.tideswap.io/v1",
    },
  },
});
