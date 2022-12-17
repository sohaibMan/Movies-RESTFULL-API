import { ObjectId } from "mongodb";
import client from "../connection/index.js";
class Comments {
  constructor() {
    this.comments = client.db("sample_mflix").collection("comments");
    // console.log(this.tb);
    console.log("db selected for sample_mflix collection comments");
  }

  async getComment(id) {
    return await this.comments.findOne({ _id: ObjectId(id) });
  }

  async deleteComment(id) {
    return await this.comments.deleteOne({ _id: ObjectId(id) });
  }

  async replaceComment(id, comment) {
    return await this.comments.replaceOne({ _id: ObjectId(id) }, comment, {
      upsert: true,
    });
  }

  async updateComment(id, comment) {
    return await this.comments.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: comment,
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
  }
}

export default new Comments();
