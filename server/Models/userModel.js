const mongoose = require('mongoose')
const JWT = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        firstName: {
            type: String,
        },

        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        confirmpassword: {
            type: String,
        },

        profileImagePath: {
            type: String,
            default: "",
        },

    },
    {
        timestamps: true
    }
)
UserSchema.methods.generateToken= function(){
    try{
        return JWT.sign(
            {
                //payload
                userID: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            //signature
            process.env.JWT_SECRET,
            {
                //expires
                expiresIn: "1d"
            }
        )
    }catch(err){
        console.log(err);
    }
}

UserSchema.method.comparePassword = async function (){
    return bycrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema)
module.exports = User;