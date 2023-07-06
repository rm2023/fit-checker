const axios = require('axios');

const resolvers = {
    Query: {
      getOutfit: async (_, { city }) => {
        try {
          const weatherResponse = await axios.get(
            `weather api /?city=${city}`
          );
          const temperature = weatherResponse.data.temperature;
          const conditions = weatherResponse.data.conditions;
  
          const clothingResponse = await axios.get(
            `clothing api /?temperature=${temperature}&conditions=${conditions}`
          );
  
          const outfit = clothingResponse.data.outfit;

          return outfit;
        } catch (error) {
          console.error('Error retrieving outfit:', error);
          throw new Error('Failed to retrieve outfit. Please try again.');
        }
      },
    },
  };
  
  module.exports = resolvers;