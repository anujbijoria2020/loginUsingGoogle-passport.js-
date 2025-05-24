const express = require("express");
const profileRouter = express.Router();

const  authCheck =  (req,res,next)=>{
if(!req.user){
res.redirect("/api/auth/login");
}
else{
    next();
}
};

profileRouter.get("/",authCheck,(req,res)=>{
    // res.send("logged in profile :"+req.user.username);
    res.render('profile',{
        user:req.user
    });
})

module.exports = profileRouter;
