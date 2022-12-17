import { Router } from "express";
import Comment from "../controllers/comments.js";

const router = Router({ mergeParams: true });
router.param("id", function (req, res, next, id) {
  // console.log("app.param is called", id);
  if (id.length != 24)
    return res.status(203).json({
      status: "fail",
      results: 0,
      data: {
        error: "id format is not correct",
      },
    });
  next();
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const comments = [await Comment.getComment(id)];

  if (!comments[0] || !id)
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
      comments,
    },
  });
});

router.delete("/:id", async (req, res) => {
  // console.log("req catched");
  try {
    const id = req.params.id;
    const comments = await Comment.deleteComment(id);
    // console.log("🚀 ~ file: comments.js:43 ~ router.delete ~ comments", comments);
    if (!comments.acknowledged)
      return res.status(404).json({
        status: "fail",
        results: comments.length,
        data: {
          error: "An error was occured ",
        },
      });
    res.json(comments);
  } catch (e) {
    console.error(e);
    throw e;
  }
  //   // console.log("🚀 ~ file: comments.js:20 ~ router.get ~ comments", comments);
  //   // console.log("🚀 ~ file: comments.js:6 ~ router.get ~ mycomments", mycomments);
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const comments = req.body;
    const newcomments = await Comment.replaceComment(id, comments);
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

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const comments = req.body;
    const newcomments = await Comment.updateComment(id, comments);
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

export default router;
