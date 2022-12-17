import { Router } from "express";
import Movie from "../controllers/movies.js";
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
  const movie = [await Movie.getMovie(id)];
  // console.log("🚀 ~ file: movies.js:20 ~ router.get ~ movie", movie);
  // console.log("🚀 ~ file: movies.js:6 ~ router.get ~ mymovie", mymovie);
  if (!movie[0])
    return res.status(404).json({
      status: "fail",
      results: movie.length,
      data: {
        error: "can't find a movie with this id",
      },
    });
  res.status(200).json({
    status: "succes",
    results: movie.length,
    data: {
      movies: movie,
    },
  });
});
router.delete("/:id", async (req, res) => {
  // console.log("req catched");
  try {
    const id = req.params.id;
    const movie = await Movie.deleteMovie(id);
    // console.log("🚀 ~ file: movies.js:43 ~ router.delete ~ movie", movie);
    if (!movie.acknowledged)
      return res.status(404).json({
        status: "fail",
        results: movie.length,
        data: {
          error: "An error was occured ",
        },
      });
    res.json(movie);
  } catch (e) {
    console.error(e);
    throw e;
  }
  // console.log("🚀 ~ file: movies.js:20 ~ router.get ~ movie", movie);
  // console.log("🚀 ~ file: movies.js:6 ~ router.get ~ mymovie", mymovie);
});
router.get("/", async (req, res) => {
  // console.log("req catched");
  // const { start, end } = req.query;
  const { option } = req.query;
  const options = ["random", "genre"];

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
        error: "the size you asked is too big Max 20 movies per responde",
      });
    const movie = await Movie.getMovies(+size);
    // console.log("🚀 ~ file: movies.js:49 ~ router.get ~ movie", movie);
    // console.log("🚀 ~ file: movies.js:20 ~ router.get ~ movie", movie);
    // console.log("🚀 ~ file: movies.js:6 ~ router.get ~ mymovie", mymovie);
    return res.status(200).json({
      status: "succes",
      results: movie.length,
      data: {
        movies: movie,
      },
    });
  } else if (option == "genre") {
    const { genre, size } = req.query;
    const genres = [
      "Comedy",
      "Fantasy",
      "Crime",
      "Drama",
      "Music",
      "Adventure",
      "History",
      "Thriller",
      "Animation",
      "Family",
      "Mystery",
      "Biography",
      "Action",
      "Film-Noir",
      "Romance",
      "Sci-Fi",
      "War",
      "Western",
      "Horror",
      "Musical",
      "Sport",
    ];
    if (+size <= 0)
      return res
        .status(404)
        .json({ error: "the size you asked in not a postive integer" });
    if (+size > 20)
      return res.status(404).json({
        error: "the size you asked is too big Max 20 movies per responde",
      });
    if (!genres.includes(genre))
      return res.status(404).json({ error: "the gener is not exist" });
    const movie = await Movie.getMoviesByGenre(genre, +size);
    // console.log("🚀 ~ file: movies.js:105 ~ router.get ~ movie", movie);
    if (!movie[0])
      return res.status(404).json({
        status: "fail",
        results: movie.length,
        data: {
          error: "can't find a movie with this genre",
        },
      });
    res.status(200).json({
      status: "succes",
      results: movie.length,
      data: {
        movies: movie,
      },
    });
  }
  // console.log("🚀 ~ file: movies.js:42 ~ router.get ~ option", option, size);
  // const movie = [await Movie.getMovies(id)];
  // console.log("🚀 ~ file: movies.js:20 ~ router.get ~ movie", movie);
  // console.log("🚀 ~ file: movies.js:6 ~ router.get ~ mymovie", mymovie);
  // if (!movie[0])
  //   return res.status(404).json({
  //     status: "fail",
  //     results: movie.length,
  //     data: {
  //       error: "can't find a movie with this id",
  //     },
  //   });
  // res.status(200).json({
  //   status: "succes",
  //   results: movie.length,
  //   data: {
  //     movies: movie,
  //   },
  // });
  // res.send("done");
});
router.post("/", async (req, res) => {
  // const movieSchema = new SchemaObject({ name: String });
  try {
    const movie = req.body;
    // console.log("🚀 ~ file: movies.js:149 ~ router.post ~ movie", movie);
    const newMovie = await Movie.addMovie(movie);
    // console.log("🚀 ~ file: movies.js:151 ~ router.post ~ newMovie", newMovie);
    res.status(201).json({
      status: "succes",
      data: {
        movie: newMovie,
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
    const movie = req.body;
    const newMovie = await Movie.replaceMovie(id, movie);
    // console.log("🚀 ~ file: movies.js:151 ~ router.post ~ newMovie", newMovie);
    res.status(201).json({
      status: "succes",
      data: {
        movie: newMovie,
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
    const movie = req.body;
    const newMovie = await Movie.updateMovie(id, movie);
    // console.log("🚀 ~ file: movies.js:151 ~ router.post ~ newMovie", newMovie);
    res.status(201).json({
      status: "succes",
      data: {
        movie: newMovie,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export default router;
