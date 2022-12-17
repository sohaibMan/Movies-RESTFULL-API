import CommentMovie from "../controllers/commentsMovies.js"; //class
import { Router } from "express";
const router = Router({ mergeParams: true });
router.get("/", async (req, res) => {
  const { id } = req.params;
  const { s: start, e: end } = req.query;
  // console.log("🚀 ~ file: comments.js:20 ~ router.get ~ end", end);
  // console.log("🚀 ~ file: comments.js:20 ~ router.get ~ start", start);
  if (!start || !end)
    return res.status(203).json({
      status: "fail",
      results: 0,
      data: {
        error: "start and end are required",
      },
    });
  if (+start < 0 || +end < 0)
    return res.status(203).json({
      status: "fail",
      results: 0,
      data: {
        error: "start and end must be positive integers",
      },
    });
  if (+start > +end)
    return res.status(203).json({
      status: "fail",
      results: 0,
      data: {
        error: "start must be less than end",
      },
    });
  if (+end - +start > 20)
    return res.status(203).json({
      status: "fail",
      results: 0,
      data: {
        error: "the difference between start and end must be less than 20",
      },
    });

  const comments = await CommentMovie.getComments(id, +start, +end);

  if (!comments[0])
    return res.status(404).json({
      status: "fail",
      results: comments.length,
      data: {
        error: "can't find a comments with this movie id",
      },
    });
  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments: comments,
    },
  });
});
router.post("/", async (req, res) => {
  // const commentschema = new SchemaObject({ name: String });
  try {
    const comment = req.body;
    // console.log("🚀 ~ file: comments.js:149 ~ router.post ~ comments", comments);
    const newcomments = await CommentMovie.addComment(comment);
    // console.log("🚀 ~ file: comments.js:151 ~ router.post ~ newcomments", newcomments);
    res.status(201).json({
      status: "success",
      data: {
        comments: newcomments,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
});
router.delete("/", async (req, res) => {
  try {
    const { id } = req.params;
    const movieComment = await CommentMovie.deleteComments(id);
    // console.log("🚀 ~ file: movies.js:43 ~ router.delete ~ movie", movie);
    if (!movieComment.acknowledged)
      return res.status(404).json({
        status: "fail",
        results: movieComment.length,
        data: {
          error: "An error was occured ",
        },
      });
    res.json(movieComment);
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export default router;
