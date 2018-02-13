const express = require('express');
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("index"));
        router.get('/users',isLoggedIn,(req,res)=>res.render("users"));
        router.get('/groups',isLoggedIn,(req,res)=>res.render("groups"));
        router.get("/auth/XXXXX",passport.authenticate('XXXXX',{     // passport-strategy to be added...
            scope: ['user_friends', 'manage_pages'] 
        }));
        router.get("/auth/XXXXX/callback",passport.authenticate('XXXXX',{
            failureRedirect: "/"
        }),(req,res)=>res.redirect('/users'));
        return router;
    }
}