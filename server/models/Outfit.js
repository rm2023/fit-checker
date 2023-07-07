const { model } = require('mongoose');

class Outfit {
    constructor(top, bottom, shoes) {
        this.top = top;
        this.bottom = bottom;
        this.shoes = shoes;
    }
}

const Outfit = model('Outfit', Outfit);

module.exports = Outfit;