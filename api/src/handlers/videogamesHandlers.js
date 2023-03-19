const {  
    getAllVideogames,
    searchVideogamesByName,
    getVideogameDbById,
    getVideogameApiById,
    createVideogame,
} = require("../controllers/videogamesControllers");


// ------------------------------------------- HANDLERS: ---------------------------------------- // 


// ------------------- ESTE HANDLER TRAE TODOS LOS JUEGOS Y BUSCA POR QUERY ----------------------//
// GET /videogames:
// Obtener un listado de los videojuegos. OK 
// Debe devolver solo los datos necesarios para la ruta principal. OK
// GET /videogames?name="...":
// Obtener un listado de los primeros 15 videojuegos que contengan la palabra ingresada como query parameter. Ok
// Si no existe ningún videojuego mostrar un mensaje adecuado.  OK
const getAllVideogamesHandler = async (req, res) => {
    const {name} = req.query;

    try {
        // Existe un name
        if(name){

            // Ejecuto la función controller
            const videogamesByname = await searchVideogamesByName(name)

            // Encontraste algo ?                
            videogamesByname.length ? res.status(200).json(videogamesByname) :
            res.status(400).send("Sorry, videogame not found");
        }else{
            const allVideogames = await getAllVideogames();
            return res.status(200).json(allVideogames);
        }
    } catch (error) {
       return res.status(400).json({error: error.message});
    }; 

};


// ------------------ ESTE HANDLER MUESTRA EL DETALLE DE UN VIDEOJUEGO POR ID -------------------- //
//  GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular. OK
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego.
// Incluir los géneros asociados. OK
const getVideogameIdHandeler = async (req, res) => {
    const { id } = req.params;

     try {
        
        if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            const dbVideogamesById = await getVideogameDbById(id);
            return res.status(200).json(dbVideogamesById);
        } else{
            const apiVideogameById = await getVideogameApiById(id)
            return res.status(200).json(apiVideogameById);
        }
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};


// ----------------------------- ESTE HANDLER CREA UN NUEVO VIDEOGAME -------------------------- //
// POST /videogames:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de 
// videojuego por body. OK
// Crea un videojuego en la base de datos, relacionado a sus géneros. OK
const createVideogameHandeler = async (req, res) => {
    const {name, description, released, rating, image, platforms, genres} = req.body;
    
   try {
    const newVideogame = await createVideogame(name, description, released, rating, image, platforms, genres);
    res.status(201).json(newVideogame);
   } catch (error) {
    res.status(400).json({ error: error.message });
   }
};



module.exports = {
    getAllVideogamesHandler,
    getVideogameIdHandeler,
    createVideogameHandeler
};












 // const totalVideogames = await getAllVideogames();

    // if(id) {
    //     const videogamesById = totalVideogames.filter(element => element.id == id)
    //     videogamesById.length ? res.status(200).json(videogamesById) : res.status(404).send("Sorry, invalid ID");
    // }








 // try {
        
    //     if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
    //         const dbVideogamesById = await getVideogameDbById(id);
    //         return res.status(200).json(dbVideogamesById);
    //     } else{
    //         const apiVideogameById = await getApiById(id)
    //         return res.status(200).json(apiVideogameById);
    //     }
    // } catch (error) {
    //     return res.status(400).json({error: error.message});
    // }