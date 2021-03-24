const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../Models/user.model');
global.atob = require('atob');

require('dotenv').config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_SECRET_ID = process.env.GITHUB_SECRET_ID

router.post('/register', async (req, res, next) => {
    passport.authenticate('signup', async(err, user) => {
        try{
            if(err) return next(new Error(err))
            if(user){
                req.login(user, {session: false}, async (error) => {
                    if(error) return next(error);
                    const body = {_id: user._id, email: user.email, name: user.name, secret_token: user.secret_token};
                    const token = jwt.sign({ user: body }, 'TOP_SECRET');

                    return res.cookie('token', jwt.sign({ user: {_id: req.user._id, name: req.user.name, email: req.user.email, secret_token: req.user.secret_token} }, 'TOP_SECRET'), {httpOnly: true}).json({token});
                })
            }else{
                return res.status(406).json({"message": "Email has been taken."})
            }
        }catch(err){
            return next(err);
        }
    })(req, res, next);
})
router.post('/login', async(req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try{
            if(err) return res.status(400).json("Something went wrong!")
            if(!user){
                return res.status(400).json("User not found.")
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

const parseJwt = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
}

const parseHeader = cookie => {
    return {key: cookie.split('=')[0], value: cookie.split('=')[1]}
}

router.get('/profile', jsonParser, async (req, res) => {
    if(req.headers.cookie){
        let user =parseJwt(parseHeader(req.headers.cookie).value).user
        if(user){
            const isValidUser = await User.exists({name: user.name, email: user.email, secret_token: user.secret_token})
            if(isValidUser) res.json({"message": "Authenticated", user})
            else return res.json({unauthorized: true})
        }else{
            return res.json({unauthorized: true})
        }
    }else return res.json({unauthorized: true})
})

router.post('/oauth', jsonParser, async (req, res) => {
    console.log(req.body.code)
})

module.exports = router;