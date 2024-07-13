const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData });
    } catch (error) {
        console.log("error from the user root")
    }
}

const getUser = async (req, res) => {
    try {
        // const userData = req.user;
        const {userId} = req.params;
        const userData = await User.find({userId: userId});
        return res.status(200).json({ userData });
    } catch (error) {
        console.log("error from the user root")
    }
}


const allUsers = async (req, res) => {
    try {
        const userData = await User.find();
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log("error from the user root")
    }
}

const Deletuser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userData = await User.findOneAndDelete({ userId: userId })
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log("error from the user root")
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    },
});

const upload = multer({ storage }).single("profileImage");

const userRegister = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            try {
                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading
                    return res.status(500).json({ message: "Multer error", error: err.message });
                } else if (err) {
                    // An unknown error occurred when uploading
                    return res.status(500).json({ message: "Unknown error", error: err.message });
                }
                /* Take all information from the form */
                const { firstName, lastName, email, password } = req.body;
                /* The uploaded file is available as req.file */

                const profileImage = req.file;

                if (!profileImage) {
                    return res.status(400).send("No file uploaded");
                }

                /* path to the uploaded profile photo */
                const profileImagePath = profileImage.path;

                /* Check if user exists */
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(409).json({ message: "User already exists!" });
                }

                /* Hash the password */
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);

                /* Generate UUID */
                const userId = uuidv4();

                /* Create a new User */
                const newUser = new User({
                    userId,
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    profileImagePath,
                });

                /* Save the new User */
                await newUser.save();

                /* Send a successful message */
                res
                    .status(200)
                    .json({ message: "User registered successfully!", user: newUser });
                // console.log(newUser);
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "Registration failed!", error: err.message });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error occurred!", error: err.message });
    }
};



const userLogin = async (req, res) => {
    try {
        /* Take the infomation from the form */
        const { email, password } = req.body;

        /* Check if user exists */
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "User doesn't exist!" });
        }

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        } else {
            res.status(200).json({
                msg: "Login successfull",
                token: await user.generateToken(),
                userId: user._id.toString(),
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = { user, allUsers, userRegister, userLogin, Deletuser, getUser }