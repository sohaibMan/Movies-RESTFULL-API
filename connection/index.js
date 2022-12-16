import dotenv from "dotenv";
import { MongoClient } from "mongodb";

console.log("connecting to database ....");
dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;
// console.log("🚀 ~ file: index.js:8 ~ uri", uri);
export default new MongoClient(uri);

// const wtf = await new MongoClient(uri)
//   .db("sample_mflix")
//   .collection("movies")
//   .findOne();
// console.log("🚀 ~ file: index.js:11 ~ wtf", wtf);
