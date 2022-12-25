export default function filesPayloadExists(req, res, next) {
  if (!req.files) {
    return res.status(422).json({
      status: "fail",
      data: {
        error: "no files were uploaded",
      },
    });
  }
  next();
}
