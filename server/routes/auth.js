import express from "express";

const router = express.Router();
import asyncHandler from "express-async-handler";
import {loginUser, registerUser} from "../controllers/auth";


router.get("/register",(req,res) => {
    res.send("register user");
});


router.post('/register', registerUser)
router.post('/login', loginUser)



module.exports = router;
