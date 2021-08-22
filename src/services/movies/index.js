import express from "express"
import { getMovies, writeMovies } from "../../lib/fs-tools.js"
import uniqid from "uniqid"
// import { HttpError } from "http-errors"

const moviesRouter = express.Router()

moviesRouter.get("/", async (req, res, next) => {
  try {
    const movies = await getMovies()
    res.send(movies)
  } catch (error) {
    next(error) //from http-errors
  }
})

moviesRouter.post("/", async (req, res, next) => {
  try {
    const movies = await getMovies()
    const newMovie = { ...req.body, imdbID: uniqid(), createdAt: new Date() }

    movies.push(newMovie)
    await writeMovies(movies)
    res.status(201).send({ imdbID: newMovie.imdbID })
  } catch (error) {
    next(error) //from http-errors
  }
})

moviesRouter.get("/:imdbID", async (req, res, next) => {
  try {
    const movies = await getMovies()

    const movie = movies.find((m) => m.imdbID === req.params.imdbID)

    if (movies) {
      res.send(movie)
    } else {
      next(`The movie with id ${req.params.imdbID} was not found`)
    }
    res.send()
  } catch (error) {
    next(error) //from http-errors
  }
})

moviesRouter.delete("/:imdbID", async (req, res, next) => {
  try {
    const movies = await getMovies()

    const remainingMovies = movies.find((m) => m.imdbID !== req.params.imdbID)
    await writeMovies(remainingMovies)

    res.status(204).send({ imdbID: req.params.imdbID })
  } catch (error) {
    next(error) //from http-errors
  }
})

moviesRouter.put("/:imdbID", async (req, res, next) => {
  try {
    const movies = await getMovies()

    const remainingMovies = movies.filter((m) => m.imdbID !== req.params.imdbID)
    const modifiedMovie = { ...req.body, imdbID: req.params.imdbID }
    remainingMovies.push(modifiedMovie)

    await writeMovies(remainingMovies)

    res.status(201).send({ imdbID: req.params.imdbID })
  } catch (error) {
    next(error) //from http-errors
  }
})

export default moviesRouter
