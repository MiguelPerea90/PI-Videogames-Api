const {Router} = require ('express');

const platformsRouter = Router();


const { getAllPlatformsHandler } = require("../handlers/platformsHandelers")

platformsRouter.get("/", getAllPlatformsHandler)


module.exports = platformsRouter;