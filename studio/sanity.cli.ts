import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "8wo5q7ky", dataset: "production" },
  // El panel queda en https://tsl-mexico.sanity.studio al correr `npm run deploy`
  studioHost: "tsl-mexico",
  deployment: { autoUpdates: true },
});
