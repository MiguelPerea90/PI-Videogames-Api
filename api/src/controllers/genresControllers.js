const axios = require("axios");
const { API_KEY, API_URL_GENRES} = process.env;
const { Genre } = require("../db");

const getAllGenres = async () => {
    const apiGenres = ( 
        await axios.get(`${API_URL_GENRES}?key=${API_KEY}`)
    ).data.results;

    const dbGenres = await Genre.bulkCreate(apiGenres);

    return dbGenres;
};

module.exports = { getAllGenres };