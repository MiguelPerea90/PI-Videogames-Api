const axios = require("axios");
const { API_KEY, API_URL_PLATFORMS} = process.env;
const { Platform } = require("../db");

const getAllPlatforms = async () => {
    const apiPlatforms = ( 
        await axios.get(`${API_URL_PLATFORMS}?key=${API_KEY}`)
    ).data.results;

    const dbPlatforms = await Platform.bulkCreate(apiPlatforms);

    return dbPlatforms;
};

module.exports = { getAllPlatforms };