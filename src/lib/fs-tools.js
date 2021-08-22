import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON } = fs

const movieJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/movies.json"
)

export const getMovies = () => readJSON(movieJSONPath)
export const writeMovies = (content) => writeJSON(movieJSONPath, content)
