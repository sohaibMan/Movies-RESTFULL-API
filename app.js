import dotenv from "dotenv";
import express, { json } from "express";
import moviesRouter from "./routes/movies.js";
import theatersRouter from "./routes/theaters.js";
import commentsRouter from "./routes/comments.js";
const app = express();

import morgan from "morgan";
app.use(morgan("dev"));
app.use(json());

// app.param("id", (req, res, next, id) => {
//   console.log("entred");
//   console.log(id, "the log ");
//   next();
// });

// app.get("/api/v1/coures/:id", function (req, res, next) {
//   console.log("Welcome to Tutorials Point!");

//   res.end();
// });

app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/comments", commentsRouter); //! the id of the movies
app.use("/api/v1/theaters", theatersRouter);
app.listen(8080);

// users
// import client from "./Connection/index.js";
// import { MongoClient } from "mongodb";
// app.use(json({ limit: "4mb" }));

// dotenv.config();
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;
// const client = new MongoClient(uri);

// app.get("/call", async (req, res) => {
//   //   await client.connect();
//   res.send(`db connected", ${Math.random()}`);
//   //   await client.close();
// });
// await client.connect();
// const mflix = client.db("sample_mflix");
// const movies = mflix.collection("movies");
// const comments = mflix.collection("comments");
// const sessions = mflix.collection("sessions");
// const theaters = mflix.collection("theaters");
// const users = mflix.collection("users");

// const data = await movies.findOne();
// console.log("this is my data", data);
// console.log(client);

// console.log("🚀 ~ file: app.js:10 ~ mflix", mflix);

// console.log("🚀 ~ file: app.js:6 ~ uri", uri);
