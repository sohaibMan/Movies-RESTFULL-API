import path from "path";
export default function fileExtLimiter(req, res, next) {
  const { files } = req;
  const allowedExtensions = [".jpg", ".png"];

  let IsAllowed = true;
  Object.keys(files).forEach((key) => {
    if (!allowedExtensions.includes(path.extname(files[key].name))) {
      IsAllowed = false;
      return;
    }
  });

  if (!IsAllowed)
    //error should be more specific 403
    return res.status(422).json({
      status: "fail",
      data: {
        error: `file extension is not allowed`,
      },
    });

  next();
}
