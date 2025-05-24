
const express = require("express");  
const helmet  = require("helmet");
const app = express();
const userRouter = require("../passport_lib/routes/authRouter")
const profileRouter =require("../passport_lib/routes/profileRouter");
const passportSetup = require('./config/passport-setup')
const passport = require("passport");
const keys = require("../passport_lib/keys");
const session = require("express-session");
const mongoose  = require("mongoose");
mongoose.connect(keys.mongodb.dbURL).then(()=>{
    console.log("db connected");
});


app.set("view engine",'ejs');



app.use(express.json()); 

app.use(session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: false
}));

//intitaliz passport

app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());


app.use("/api/auth",userRouter)
app.use("/api/profile",profileRouter)

app.get("/",(req,res)=>{
    res.render('home');
})



const PORT =  3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
