import { ObjectId } from "mongodb";
import client from "../connection/index.js";
class Movies {
  constructor() {
    this.movies = client.db("sample_mflix").collection("movies");
    // console.log(this.db);
    console.log("db selected for sample_mflix collection movies");
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
  async getMoviesByGenre(genre, size) {
    // console.log(genre, size);
    return await this.movies
      .find({ genres: { $in: [genre] } })
      .limit(size)
      .toArray();
  }
  async deleteMovie(id) {
    return await this.movies.deleteOne({ _id: ObjectId(id) });
  }
  async addMovie(movie) {
    return await this.movies.insertOne(movie);
  }
  async replaceMovie(id, movie) {
    // return await this.movies.findOneAndReplace({ _id: ObjectId(id) }, movie, {
    //   returnDocument: "after",
    //   upsert: true,
    // });
    return await this.movies.replaceOne({ _id: ObjectId(id) }, movie, {
      upsert: true,
    });
  }
  async updateMovie(id, movie) {
    return await this.movies.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: movie,
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
  }
}

export default new Movies();
