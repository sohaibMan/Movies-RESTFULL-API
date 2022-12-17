import { Router } from "express";
import Theater from "../controllers/theaters.js";
// todo refactore this part (DRY)
const router = Router();
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
  // console.log("req catched");
  const id = req.params.id;
  const theaters = [await Theater.getTheater(id)];
  // console.log("🚀 ~ file: theaters.js:20 ~ router.get ~ theaters", theaters);
  // console.log("🚀 ~ file: theaters.js:6 ~ router.get ~ mytheaters", mytheaters);
  if (!theaters[0])
    return res.status(404).json({
      status: "fail",
      results: theaters.length,
      data: {
        error: "can't find a theaters with this id",
      },
    });
  res.status(200).json({
    status: "success",
    results: theaters.length,
    data: {
      theaters: theaters,
    },
  });
});
router.get("/", async (req, res) => {
  // console.log("req catched");
  // const { start, end } = req.query;
  const { option } = req.query;
  const options = ["random"];

  if (!options.includes(option))
    return res.status(404).json({ error: "the option you asked is not valid" });

  if (option == "random") {
    const { size } = req.query;
    if (+size <= 0)
      return res
        .status(404)
        .json({ error: "the size you asked in not a postive integer" });
    if (+size > 20)
      return res.status(404).json({
        error: "the size you asked is too big Max 20 theaters per responde",
      });
    const theater = await Theater.getTheaters(+size);
    // console.log("🚀 ~ file: theaters.js:49 ~ router.get ~ theater", theater);
    // console.log("🚀 ~ file: theaters.js:20 ~ router.get ~ theater", theater);
    // console.log("🚀 ~ file: theaters.js:6 ~ router.get ~ mytheater", mytheater);
    return res.status(200).json({
      status: "success",
      results: theater.length,
      data: {
        theaters: theater,
      },
    });
  }
});
router.delete("/:id", async (req, res) => {
  // console.log("req catched");
  try {
    const id = req.params.id;
    const theaters = await Theater.deleteTheater(id);
    // console.log("🚀 ~ file: theaters.js:43 ~ router.delete ~ theaters", theaters);
    if (!theaters.acknowledged)
      return res.status(404).json({
        status: "fail",
        results: theaters.length,
        data: {
          error: "An error was occured ",
        },
      });
    res.json(theaters);
  } catch (e) {
    console.error(e);
    throw e;
  }
  // console.log("🚀 ~ file: theaters.js:20 ~ router.get ~ theaters", theaters);
  // console.log("🚀 ~ file: theaters.js:6 ~ router.get ~ mytheaters", mytheaters);
});
router.post("/", async (req, res) => {
  // const theaterschema = new SchemaObject({ name: String });
  try {
    const theater = req.body;
    // console.log("🚀 ~ file: theaters.js:149 ~ router.post ~ theaters", theaters);
    const newtheaters = await Theater.addTheater(theater);
    // console.log("🚀 ~ file: theaters.js:151 ~ router.post ~ newtheaters", newtheaters);
    res.status(201).json({
      status: "success",
      data: {
        theaters: newtheaters,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const theaters = req.body;
    const newtheaters = await Theater.replaceTheater(id, theaters);
    // console.log("🚀 ~ file: theaters.js:151 ~ router.post ~ newtheaters", newtheaters);
    res.status(201).json({
      status: "success",
      data: {
        theaters: newtheaters,
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
    const theaters = req.body;
    const newtheaters = await Theater.updateTheater(id, theaters);
    // console.log("🚀 ~ file: theaters.js:151 ~ router.post ~ newtheaters", newtheaters);
    res.status(201).json({
      status: "success",
      data: {
        theaters: newtheaters,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export default router;
