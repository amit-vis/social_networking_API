const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStratergy = require('passport-jwt').Strategy;
const secure = require('./secure');
const User = require('../model/sigup');

// stablished the authentication
const opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : secure.secretOrKey
}

passport.use(new JWTStratergy(opts, async (jwt_payload, done)=>{
    try {
        const user = await User.findById(jwt_payload._id);
        if(user){
            done(null, user)
        }else{
            done(null, false)
        }
    } catch (error) {
        console.log("Error in authenticate the user", error)
    }
}));

module.exports = passport;