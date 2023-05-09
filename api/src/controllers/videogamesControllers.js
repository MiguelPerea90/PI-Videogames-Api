const axios = require("axios");
// const data = require("./dataApi")
const { Videogame, Genre, Platform } = require("../db");
const { API_KEY, API_URL} = process.env;


// CONTROLLERS:

 // ESTA FUNCIÓN MAPEA LOS RESULTADOS DE LA API // - NO ESTÁ EN USO - //
//  const cleanArray = (arr) => {
//     return arr.map( element => {
//         return {
//           id: element.id,
//           name: element.name,
//           released: element.released,
//           image: element.image,
//           description: element.description,
//           rating: element.rating,
//           Platforms: element.Platforms.map(element => {
//               return {
//                   id: element.id,
//                   name: element.name
//               }
//           }),
//           Genres: element.Genres.map(element => {
//               return {
//                   id: element.id,
//                   name: element.name
//               }
//           })
//         };
//     });
// };

//  // ESTE CONTROLLER TRAE TODO DE LA DB Y LA API
const getAllVideogames = async () => {

    //Aqui traigo todos los videogames de la db.
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
    
   
    // &page_size=40
    let pages = 0;
    let results = [...databaseVideogames]; //sumo lo que tengo en la DB
    let response = await axios.get(`${API_URL}?key=${API_KEY}`);
    while (pages < 6) {
        pages++;
        //filtro solo la DATA que necesito enviar al FRONT
        const apiVideogamesClean = response.data.results.map(videogame => {
		    return {
                id: videogame.id,
                name: videogame.name,
                released: videogame.released,
                image: videogame.background_image,
                rating: videogame.rating,
                Genres: videogame.genres.map(element => {
                    return {
                        id: element.id,
                        name: element.name,
                    }
                }),
                Platforms: videogame.platforms.map(element => {
                    return {
                        id: element.platform.id,
                        name: element.platform.name
                    }
                }),
        };
		    });
        results = [...apiVideogamesClean, ...results]
        response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
    }

    return results;
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



 //  // &page_size=40
    // // Aqui traigo todos los videogames de la api.
    // const apiVideogames = [];
    // const  videogamesRequest = ( 
    //     await axios.get(`${API_URL}?key=${API_KEY}&page_size=40`)
    // ).data.results;

    // const apiVideogamesClean = apiVideogames?.map(videogame => { 
    //     return {
    //             id: videogame.id,
    //             name: videogame.name,
    //             released: videogame.released,
    //             image: videogame.background_image,
    //             rating: videogame.rating,
    //             Genres: videogame.genres.map(element => {
    //                 return {
    //                     id: element.id,
    //                     name: element.name,
    //                 }
    //             }),
    //             Platforms: videogame.platforms.map(element => {
    //                 return {
    //                     id: element.platform.id,
    //                     name: element.platform.name
    //                 }
    //             }),
    //     };
    // })

    // while (pages < 6) {
    //     pages++;
    //     //filtro solo la DATA que necesito enviar al FRONT
    //     const gammesREADY = response.data.results.map(game => {
    //         return{
    //             id: game.id,
    //             name: game.name,
    //             background_image: game.background_image,
    //             rating: game.rating,
    //             genres: game.genres.map(g => g.name)
    //         }
    //     });
    //     results = [...results, ...gammesREADY]
    //     response = await axios.get(response.data.next) //vuelvo a llamar a la API con next
    // }

    

    // const infoTotal = [...apiVideogamesClean, ...databaseVideogames];