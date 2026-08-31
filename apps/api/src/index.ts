import { createApp } from "./app";
import { config } from "./config";

const app = createApp();

app.listen(config.port, () => {
  console.log(`💙 ARUHEALTH API running at http://localhost:${config.port}/api/v1`);
  console.log(`   health: http://localhost:${config.port}/api/v1/health`);
});