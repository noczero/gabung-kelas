import express from "express";
const router = express.Router();
import {
    loginUser,
    registerUser,
    logoutUser,
    currentUser,
    forgetPassword,
    resetPassword,
    verifyUser, resendVerificationCode
} from "../controllers/auth";
import {requireSignin} from "../middlewares";

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

router.post('/forgot-password', forgetPassword);
router.post('/reset-password', resetPassword);

router.get('/user', requireSignin, currentUser);
router.post('/user/verification', requireSignin, verifyUser);
router.put('/user/verification', requireSignin, resendVerificationCode);


module.exports = router;
