const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('dotenv').config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_SECRET_ID = process.env.GITHUB_SECRET_ID

router.post('/register', async (req, res, next) => {
    passport.authenticate('signup', async(err, user) => {
        try{
            if(err) return next(new Error(err))
            req.login(user, {session: false}, async (error) => {
                if(error) return next(error);
                const body = {_id: user._id, email: user.email, name: user.name, secret_token: user.secret_token};
                const token = jwt.sign({ user: body }, 'TOP_SECRET');

                return res.cookie('token', jwt.sign({ user: {_id: req.user._id, name: req.user.name, email: req.user.email, secret_token: req.user.secret_token} }, 'TOP_SECRET'), {httpOnly: true}).json({token});
            })
        }catch(err){
            return next(err);
        }
    })(req, res, next);
})
router.post('/login', async(req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try{
            if(err) return next(new Error(err))
            if(!user){
                const error = new Error("User not found.");
                return next(error)
            }
            req.login(user, {session: false}, async (error) => {
                if(error) return next(error);
                const body = {_id: user._id, email: user.email, name: user.name, secret_token: user.secret_token};
                const token = jwt.sign({ user: body }, 'TOP_SECRET');

                return res.cookie('token', jwt.sign({ user: {_id: req.user._id, name: req.user.name, email: req.user.email, secret_token: req.user.secret_token} }, 'TOP_SECRET'), {httpOnly: true}).json({"message": "Logged in successfully"});
            })
        }catch(err){
            return next(err);
        }
    })(req, res, next);
})

module.exports = router;