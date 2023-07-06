const { Schema, model } = require('mongoose');

class Weather {
    constructor(temperature, conditions) {
        this.temperature = temperature;
        this.conditions = conditions;
    }
}

const Weather = model('Weather', Weather);

module.exports = Weather;