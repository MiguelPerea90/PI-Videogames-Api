const axios = require("axios");

const { getAllGenres } = require("../controllers/genresControllers")

const {Genre} = require("../db")


// GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles.
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos
//  y luego ya utilizarlos desde allí.
const  getAllGenresHandler = async (req, res) => {

    try {
        const allGenres = await Genre.findAll() 
        if(allGenres.length) {
            return res.status(200).json(allGenres)
        }else{
            const dbGenres = await getAllGenres();
            return res.status(200).json(dbGenres)
        }
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = { getAllGenresHandler };