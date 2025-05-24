const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../keys");
const UserModel  = require("../models/UserModel");

passport.serializeUser((user,done)=>{
done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    UserModel.findById(id).then((user)=>{
        done(null,user);
    })
})



passport.use(new GoogleStrategy({
//options for the google start
callbackURL:"/api/auth/google/redirect",
clientID:keys.google.clientID,
clientSecret:keys.google.clientSecret,
}, (accesToken,refreshToken,profile,done)=>
    {
        //passport callback function
        console.log("passport callback fun called");
        console.log(profile);

     UserModel.findOne({
   googleId:profile.id,
        }).then((currentUser)=>{
if(currentUser){
    //user already exists
    console.log("user is :",currentUser);
    done(null,currentUser);
    
}
else{
    //dont have user so create a new user
         new UserModel(
            {
username:profile.displayName,
googleId:profile.id
            }
        ).save()
        .then((newUser)=>{
            console.log("new user created",newUser);
            done(null,newUser);
        });
}
        });
   
})
)
