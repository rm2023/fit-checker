const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('../models/User'); // Assuming you have a User model
const { model } = require('mongoose');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your-secret-key' // Replace with your own secret key
  };
  
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.userId);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
  
  const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
      if (error) {
        return res.status(500).json({ error: 'Server Error' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
  };

  module.exports = authMiddleware;