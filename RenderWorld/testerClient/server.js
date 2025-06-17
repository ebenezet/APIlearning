import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});

const colours = ["red", "black", "green", "yellow"];

app.get("/colours", (request, response) => {
  response.json(colours);
});

app.post("/message", (request, response) => {
  response.json("Hi dear friend");
});

app.use(express.json());
