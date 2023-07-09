const express = require('express');
const router = express.Router();
const { getOutfitRecommendation } = require('../controllers/outfit-controller');


router.get('/', async (req, res) => {
    try {
        const { city } = req.query;

        const outfit = await getOutfitRecommendation(city);

        res.json(outfit);
    } catch (error) {
        console.error('Couldnt retrieve outfit:', error);
        res.status(500).json({ error: 'Couldnt retrieve outfit recommendation' });
    }
});

module.exports = router;