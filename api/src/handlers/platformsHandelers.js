const axios = require("axios");

const { getAllPlatforms } = require("../controllers/platformsControllers")

const { Platform } = require("../db")


// GET /platforms:
// Obtener todos los tipos de plataformas de videojuegos posibles.
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos
//  y luego ya utilizarlos desde allí.
const  getAllPlatformsHandler = async (req, res) => {

    try {
        const allPlatforms = await Platform.findAll() 
        if(allPlatforms.length) {
            return res.status(200).json(allPlatforms)
        }else{
            const dbplatforms = await getAllPlatforms();
            return res.status(200).json(dbplatforms)
        }
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = { getAllPlatformsHandler };