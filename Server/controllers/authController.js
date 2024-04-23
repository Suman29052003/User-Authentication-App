const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const createError = require("../utils/errorHandler");

// Register User
exports.signUp = async (req, res, next) => {
  try {
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User already exists!");
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
    const token = jwt.sign(
      {
        _id: newUser._id, // Corrected from 'username._id' to 'newUser._id'
      },
      "secretkey123",
      {
        expiresIn: "90d",
      }
    );

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });

    console.log("User registered successfully!");
  } catch (error) {
    next(error);
  }
};

// Login User
exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email }); // Add 'await' to wait for the promise to resolve
  
      if (!user) {
        return next(new createError("Invalid Credentials", 404));
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return next(new createError("Invalid email or Password", 401));
      }
      const token = jwt.sign(
        {
          _id: user._id, // Corrected from 'newUser._id' to 'user._id'
        },
        "secretkey123",
        {
          expiresIn: "90d",
        }
      );
  
      res.status(200).json({
        status: "Success",
        token,
        message: "Login Successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  };
  
