const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require ("../db.js");
const { API_KEY } = process.env;
const apiLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

//Info de la API

const getApiInfo = async () => {
    const apiUrl = await axios.get (apiLink);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
            image: el.image.url,
            temperament: el.temperament ? el.temperament : 'Sin temperamento asignado',
        }
    });
    return apiInfo;
};

//Info de la Base de datos

const getDbInfo = async () => {
    const dogsDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    return dogsDb;
};

// Concateno la info de la API y de la Base de datos

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

module.exports = { getAllDogs, getDbInfo, getApiInfo }