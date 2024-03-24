import express from "express";
import cors from "cors";
import errorHandler from "../middleware/errorHandler";
import limiter from "../limiter";

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(errorHandler);
  app.use(limiter);

  return app;
}

export default createServer;
