import express from "express";
import fileUpload from "express-fileupload";
import fileExtLimiter from "../middleware/fileExtlimiter.js";
import fileSizeLimiter from "../middleware/fileSizeLimiter.js";
import filesPayloadExists from "../middleware/filesPayloadExists.js";
import path from "path";
import rootDir from "../helpers/rootDir.js";
import { ObjectId } from "mongodb";

const router = express.Router();
router.post("/", [
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileSizeLimiter,
  fileExtLimiter,
  (req, res) => {
    const { files } = req;
    Object.keys(files).forEach((key) => {
      const file = files[key];
      const filepath = path.join(rootDir, "files", files[key].name);
      file.mv(filepath, (err) => {
        if (err)
          return res
            .status(500)
            .json({ status: "fail", data: { error: err.message } });
      });
      // console.log("🚀 ~ file: upload.js:18 ~ files.keys.forEach ~ file", file);
    });

    res.send({
      status: "succes",
      data: {
        acknalodgment: true,
        _id: "1234",
      },
    });
  },
]);

export default router;
