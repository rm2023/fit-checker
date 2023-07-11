const axios = require('axios');
const { Weather, User, Outfit } = require('..models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password');
      }

      const token = signToken(user);
      return { token, user};
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
  },
};

module.exports = resolvers;






// const resolvers ={
//   Query: {
//     getOutfit: async () => Outfit.find(),
//     weather: async (parent, { getOutfit, name }) => {
//       const params = {};

//       if (getOutfit) {
//         params.getOutfit = getOutfit;
//       }

//       if (name) {
//         params.name = {
//           $regex: name,
//         };
//       }

//       return Weather.find(params).populate('outfit');
//     },
//     weather: async (parent, { id }) =>
//       Weather.findById(id).populate('category'),
    
//     user: async (parent, args, context) => {
//       if (context.user) {
//         const user = await User.findById(context.user.id).populate({
//           path: 'orders'
//         })
//       }
//     }
//   }
// }


// const resolvers = {
//     Query: {
//       getOutfit: async (_, { city }) => {
//         try {
//           const weatherResponse = await axios.get(
//             `weather api /?city=${city}`
//           );
//           const temperature = weatherResponse.data.temperature;
//           const conditions = weatherResponse.data.conditions;
  
//           const clothingResponse = await axios.get(
//             `clothing api /?temperature=${temperature}&conditions=${conditions}`
//           );
  
//           const outfit = clothingResponse.data.outfit;

//           return outfit;
//         } catch (error) {
//           console.error('Error retrieving outfit:', error);
//           throw new Error('Failed to retrieve outfit. Please try again.');
//         }
//       },
//     },
//   };
  
// module.exports = resolvers;