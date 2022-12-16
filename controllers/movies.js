import { ObjectId } from "mongodb";
import client from "../connection/index.js";
class Movies {
  constructor() {
    this.movies = client.db("sample_mflix").collection("movies");
    // console.log(this.db);
    console.log("db connected");
  }

  async getMovie(id) {
    // const movie = await this.movies.findOne({ _id: id });
    // console.log("sent");
    // console.log(id);
    return await this.movies.findOne({ _id: ObjectId(id) });
  }
  async getMovies(size) {
    return await this.movies.aggregate([{ $sample: { size } }]).toArray();
  }
}

export default new Movies();
