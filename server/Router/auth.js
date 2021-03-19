const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../Models/user.model');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use('signup', new localStrategy({  passReqToCallback: true }, async (req, name, password, done) => {
    try {
        const user = await UserModel.create({ name: req.body.username , email: req.body.email, password: req.body.password });
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.use('login', new localStrategy({ passReqToCallback: true}, async (req, name, password, done) => {
    UserModel.findOne({name: req.body.username}, async (err, user) => {
        if(err) return done(null, false, {message: "Something went wrong"})
        else if(!user) return done(null, false, {message: "User not found"})
        else{
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch){
                    return done(null, user, {message: "Logged in Successfully"})
                }else return done(new Error("Something went wrong!"))
            })
        }
    })
    /*try{
        const user = await UserModel.findOne({name});
        if(!user){
            return done(null, false, {message: "User not found"});
        }
        const validate = await user.comparePassword(password);
        if(!validate){
            return done(null, false, {message: "Wrong Password"})
        }
        return done(null, user, {message: "Logged in Successfully"})
    } catch(error){
        return done(error)
    }*/
}))