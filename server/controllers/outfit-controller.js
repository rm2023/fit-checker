const { Outfit, User } = require('../models');

module.exports = {
    async getOutfits(req, res) {
        try {
            const posts = await Outfit.find();
            res.json(posts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleOutfit(req, res) {
        try {
            const outfit = await Outfit.findOne({ _id: req.params.postId });
            
            if (!outfit) {
                return res.status(404).json({ message: 'No outfit with ID'});
            }

            res.json(outfit);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createOutfit(req, res) {
        try {
            const outfit = await Outfit.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { outfits: outfit._id }},
                { new: true }
            );
            
            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'Outfit created, but no user with that ID' });
            }

            res.json('Created the outfit');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};