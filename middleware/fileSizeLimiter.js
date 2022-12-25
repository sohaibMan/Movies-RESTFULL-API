const MB = 2; // the maximum file size in MB
const FILE_SIZE_LIMIT = MB * 1024 * 1024; // the maximum file size in bytes

export default function fileSizeLimiter(req, res, next) {
  if (req.headers["content-length"] > FILE_SIZE_LIMIT) {
    //we can aslo use req.files.file.size to get the file size and i think it is more better in terms of sucurety
    return res.status(422).json({
      status: "fail",
      data: {
        error: `file size limit is ${MB}MB`,
      },
    });
  }
  next();
}
