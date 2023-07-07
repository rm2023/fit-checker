const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weather-controller');

router.get('/', async (req, res) => {
    try {
        const { city } = req.query;

        const weather = await getWeather(city);

        res.json(weather);
    } catch (error) {
        console.error('Couldnt retrieve weather:', error);
        res.status(500).json({ error: 'Couldnt retrieve weather data' });
    }
});

module.exports = router;