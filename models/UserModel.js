const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
username:String,
googleId:String,
});

const UserModel = mongoose.model("UserModel",UserSchema);
module.exports  = UserModel;
