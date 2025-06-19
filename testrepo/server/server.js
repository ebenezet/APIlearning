import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CON,
});

app.get("/", (req, res) => {
  res.json("On the root route");
});

app.get("/jokes", async (req, res) => {
  const result = await db.query(`SELECT * FROM jokes`);
  res.json(result);
});

app.post("/jokes", async (req, res) => {
  const body = req.body;

  const jokeFromClient = req.body.joke;
  const punchlineFromClient = req.body.punchline;

  const data = await db.query(
    `INSERT INTO jokes (joke, punchline) VALUES ($1, $2)`,
    [jokeFromClient, punchlineFromClient]
  );

  res.send(data);
});

app.listen("4141", () => console.log("App is running on localhost:4141..."));
