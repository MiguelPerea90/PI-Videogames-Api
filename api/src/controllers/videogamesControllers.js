const axios = require("axios");
const data = require("./dataApi")
const { Videogame, Genre, Platform } = require("../db");
const { API_KEY, API_URL} = process.env;


// CONTROLLERS:

 // ESTA FUNCIÓN MAPEA LOS RESULTADOS DE LA API Y ES REQUERIDA EN getAllVideogames
 const cleanArray = (arr) => {
    return arr.map( element => {
        return {
          id: element.id,
          name: element.name,
          released: element.released,
          image: element.image,
          description: element.description,
          rating: element.rating,
          Platforms: element.Platforms.map(element => {
              return {
                  id: element.id,
                  name: element.name
              }
          }),
          Genres: element.Genres.map(element => {
              return {
                  id: element.id,
                  name: element.name
              }
          })
        };
    });
};

//  // ESTE CONTROLLER TRAE TODO DE LA DB Y LA API
const getAllVideogames = async () => {
    
 //Aqui trae todos los videogames de la db.

    const dbVideogames = cleanArray(data)

    const databaseVideogames = await Videogame.findAll({
        include: [{
            model: Genre,
            attributes: ["id", "name"],
            through: {
                attributes: []
            },
        },{
            model: Platform,
            attributes: ["id", "name"],
            through: {
                attributes: [],
            }
        }],
    }); 

    const infoTotal = [...dbVideogames, ...databaseVideogames];

    return infoTotal;
};

 // ESTE CONTROLLER BUSCA POR QUERY NAME
 const searchVideogamesByName = async (name) => {

    // Ejecuto la función que me trae toda la info de la db y la api
    let allVideogames = await getAllVideogames();

    // Filtro los que inclullan un string de el nombre pasado cómo query
    let videogamesByName = allVideogames.filter(element => 
    element.name.toLowerCase().includes(name.toString().toLowerCase()));
    
    // Retorno los resultados y me quedo con los primeros 15
    return videogamesByName.slice(0, 15);
    
};

 // // ESTE CONTROLLER OBTIENE LA INFO DE LA API POR ID
const getVideogameApiById = async (id) => {

    const apiVideogameById = (
        await axios.get(`${API_URL}/${id}?key=${API_KEY}`)
    ).data; 

    const videogameById = {
            id: apiVideogameById.id,
            name: apiVideogameById.name,
            description: apiVideogameById.description,
            released: apiVideogameById.released,
            rating: apiVideogameById.rating,
            Genres: apiVideogameById.genres.map(element => {
                return {
                    id: element.id,
                    name: element.name,
                }
            }),
            Platforms: apiVideogameById.platforms.map(element => {
                return {
                    id: element.platform.id,
                    name: element.platform.name
                }
            }),
            image: apiVideogameById.background_image,
        }

    return videogameById;
        
};

// ESTE CONTROLLER OBTIENE LA INFO DE LA DB POR ID
const getVideogameDbById = async (id) => {
    return await Videogame.findByPk(id, {
        include: [{
            model: Genre,
            attributes: ["id", "name"],
            through: {
                attributes: []
            },
        },{
            model: Platform,
            attributes: ["id", "name"],
            through: {
                attributes: [],
            }
        }],
    });
};

// ESTE CONTROLLER CREA UN NUEVO VIDEOGAME
const createVideogame  = async (name, description, released, rating, image, platforms, genres) => {

    const newVideogame = await Videogame.create({
        name,
        description,
        released, 
        rating,
        image
    });

    const genresDb = await Genre.findAll({
        where: { name: genres }
    });

    const platformsDb = await Platform.findAll({
        where: { name: platforms }
    });

    newVideogame.addGenres(genresDb);
    newVideogame.addPlatforms(platformsDb);

    return newVideogame;
};


module.exports = {
    getAllVideogames,
    searchVideogamesByName,
    getVideogameApiById,
    getVideogameDbById,
    createVideogame, 
};

