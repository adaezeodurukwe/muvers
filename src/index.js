import "@babel/polyfill";
import http from "http";
import express from "express";
import socket from "socket.io";
import bodtParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import soctets from "./socket";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin,
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});

soctets(io);

app.use(bodtParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "welcome to muvers app"
  });
});

app.use("/api/v1", routes);

const port = process.env.PORT;

server.listen(port);
