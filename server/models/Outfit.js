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

const handleError = (err) => console.error(err);

Outfit.find({})
  .exec()
  .then(collection => {
    if (collection.length === 0) {
      Outfit
        .insertMany(
          [
            { name: 'top' },
            { name: 'bottom' },
            { name: 'shoes' },
          ]
        )
        .catch(err => handleError(err));
    }
});

module.exports = Outfit;