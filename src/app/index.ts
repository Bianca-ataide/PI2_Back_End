import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.route();
  }

  middleware() {
    this.app.use(bodyParser.json());
    this.app.use(express.json({limit: '50mb'}));
    this.app.use(cors());
  }

  route() {
    // this.app.use("/", router);
  }
}

export default new App().app;
