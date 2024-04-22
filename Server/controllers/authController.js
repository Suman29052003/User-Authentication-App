const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const createError = require('../utils/errorHandler');

// Register User
exports.signUp = async (req, res, next) => {
    try {
        // Check if the user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log("User already exists!")
            return next(new createError("User already exists!", 400));
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(req.body.password, 12);

        // Create a new user
        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
        });

        // Assign JWT (Json Web Token)
        const token = jwt.sign({
            _id: newUser._id // Corrected from 'username._id' to 'newUser._id'
        }, 'secretkey123', {
            expiresIn: '90d'
        });

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            token
        });

        console.log("User registered successfully!");

    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {

};

