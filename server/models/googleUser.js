const mongoose = require("mongoose")

const GoogleUserSchema = new mongoose.Schema(
    {
        googleId: {type:String, required:true, unique:true},
        name: {type:String, required:true},
        email: {type:String, required:true, unique:true},
    },
    {timestamps:true}
);

module.exports = mongoose.model( "GoogleUser", GoogleUserSchema);