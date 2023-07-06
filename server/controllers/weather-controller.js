const axios = require('axios');
const Weather = require('./models/Weather') //add an additional . infront of ./

async function getWeather(city) {
    try {
        const response = await axios.get(`weather api url /?city=${city}`);

        const { temperature, conditions } = response.data;

        const weather = new Weather(temperature, conditions);

        return weather;
    } catch (error) {
        console.error('Error retrieving weather:', error);
        throw new Error('Failed to retrieve weather data. Try again');
    }
}

module.exports = { getWeather };