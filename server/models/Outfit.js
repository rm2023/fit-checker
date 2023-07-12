const { Schema, model } = require('mongoose');

const outfitSchema = new Schema(
    {
        temperature: {
            type: String,
        },
        conditions: {
            type: String,
        },
        top: {
            type: String, 
        },
        bottom: {
            type: String,
        },
        shoes: {
            type: String, 
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

outfitSchema 
  .virtual('outfitCount')
  .get(function () {
    return this.meta.outfits;
});

const Outfit = model('outfit', outfitSchema);

module.exports = Outfit;