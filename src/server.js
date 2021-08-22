import express from "express"
import moviesRouter from "./services/movies/index.js"

//Intitiate the server
const server = express()
//making the port
// const PORT = process.env.PORT
const port = 3001

//to allow use the json file
server.use(express.json())

/* **** ROUTES ******** */
server.use("/movies", moviesRouter)

/* ********************** */

// listen to the port
server.listen(port, () => {
  console.log("Server is listening to the PORT " + port)
})
