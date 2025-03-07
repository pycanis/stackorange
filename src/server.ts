import "dotenv/config";

import express from "express";
import next from "next";
import { registerLightningRoutes } from "./lightning";
import { subscribeInvoices } from "./subscribeInvoices";

const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  subscribeInvoices();
  registerLightningRoutes(server);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
