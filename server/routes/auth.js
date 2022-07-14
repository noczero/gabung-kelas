import express from "express";

const router = express.Router();
import asyncHandler from "express-async-handler";
import {loginUser, registerUser, logoutUser, currentUser, forgetPassword, resetPassword} from "../controllers/auth";
import {requireSignin} from "../middlewares";


router.get("/register",(req,res) => {
    res.send("register user");
});


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

router.get('/current-user', requireSignin, currentUser);
router.post('/forgot-password', forgetPassword);
router.post('/reset-password', resetPassword);



module.exports = router;
