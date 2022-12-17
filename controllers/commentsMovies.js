import { ObjectId } from "mongodb";
import client from "../connection/index.js";
class commentsMovies {
  constructor() {
    this.comments = client.db("sample_mflix").collection("comments");
    // console.log(this.tb);
    console.log("db selected for sample_mflix collection comments(movies)");
  }

  async getComments(id, start, end) {
    return await this.comments
      .find({ movie_id: ObjectId(id) })
      .skip(start)
      .limit(end - start)
      .toArray();
  }
  async deleteComments(id) {
    return await this.comments.deleteMany({ movie_id: ObjectId(id) });
  }
  async addComment(comment) {
    return await this.comments.insertOne(comment);
  }
}

export default new commentsMovies();
