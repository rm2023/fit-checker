const router = require('express').Router();
const outfitRoutes = require('./outfit-routes');
const weatherRoutes = require('./weather-routes');

router.use('/outfit', outfitRoutes);
router.use('/weather', weatherRoutes);

module.exports = router;