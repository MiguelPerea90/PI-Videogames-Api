const {Router} = require ('express');

const { getAllVideogamesHandler,
        getVideogameIdHandeler,
        createVideogameHandeler 
} = require('../handlers/videogamesHandlers');

const validate  =  require("../middleware/videogameRouterMiddleware")


const videogamesRouter = Router();

videogamesRouter.get("/", getAllVideogamesHandler);

videogamesRouter.get("/:id", getVideogameIdHandeler);

videogamesRouter.post("/", validate , createVideogameHandeler);


module.exports = videogamesRouter;