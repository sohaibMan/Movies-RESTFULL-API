import { ObjectId } from "mongodb";
import client from "../connection/index.js";
class Theaters {
  constructor() {
    this.theaters = client.db("sample_mflix").collection("theaters");
    // console.log(this.tb);
    console.log("db selected for sample_mflix collection theaters");
  }

  async getTheater(id) {
    // const theater = await this.theaters.findOne({ _id: id });
    // console.log("sent");
    // console.log(id);
    return await this.theaters.findOne({ _id: ObjectId(id) });
  }
  async getTheaters(size) {
    return await this.theaters.aggregate([{ $sample: { size } }]).toArray();
  }
  async deleteTheater(id) {
    return await this.theaters.deleteOne({ _id: ObjectId(id) });
  }
  async addTheater(theater) {
    return await this.theaters.insertOne(theater);
  }
  async replaceTheater(id, theater) {
    // return await this.theaters.findOneAndReplace({ _id: ObjectId(id) }, theater, {
    //   returnDocument: "after",
    //   upsert: true,
    // });
    return await this.theaters.replaceOne({ _id: ObjectId(id) }, theater, {
      upsert: true,
    });
  }
  async updateTheater(id, theater) {
    return await this.theaters.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: theater,
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
  }
}

export default new Theaters();
