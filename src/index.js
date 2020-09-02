import express from "express";
import bodtParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(bodtParser.json());

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send({
        message: "welcome to muvers app"
    })
});

app.use("/api/v1", routes)

const port = process.env.PORT;

app.listen(port)
