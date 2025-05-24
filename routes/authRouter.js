const express = require("express");
const userRouter = express.Router();
const passport = require("passport")

userRouter.get("/login",(req,res)=>{
res.render("login");
});


userRouter.get("/logout",(req,res)=>{
try{
    res.redirect("/api/auth/login");

}
catch(err){
    console.log(err);
}
})
userRouter.get("/google",passport.authenticate('google',{
scope:['profile'] 
}));

//callback route for google to redirect to
userRouter.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    //  res.send(req.user);
    res.redirect('/api/profile/');
})
module.exports = userRouter;
