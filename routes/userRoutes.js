// routes/userRoutes.js
import express from "express";
import userControllers from "../controllers/userControllers.js"
import hashPassword from "../middlewares/hashPassword.js";

const userRouter = express.Router();

// const userController = require('../controllers/userController');

// Routes for users
// router.get('/', userController.getAllUsers);
// Add more routes as needed

userRouter.post("/signup",hashPassword , userControllers.createUser)
userRouter.post("/login", userControllers.loginUser)

export default userRouter
