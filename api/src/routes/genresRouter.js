const {Router} = require ('express');

const genresRouter = Router();

const { getAllGenresHandler } = require("../handlers/genresHandelers")


genresRouter.get("/", getAllGenresHandler)


module.exports = genresRouter;