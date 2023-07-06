const axios = require('axios');
const Outfit = require('./models/Outfit'); //add an additional . infront of ./

async function getOutfitRecommendation(temperature, conditions) {
    try {
        const response = await axios.get(`clothing api url ${temperature}&conditions=${conditions}`);

        const { top, bottom, shoes } = response.data;

        const outfit = new Outfit(top, bottom, shoes);

        return outfit;
    } catch (error) {
        console.error('Couldnt retrieve outfit recommendation', error);
        throw new Error('Couldnt retrieve outfit recommendation, try again');
    }
}

module.exports = { getOutfitRecommendation };