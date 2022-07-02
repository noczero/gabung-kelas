import express from "express";

const router = express.Router();
import asyncHandler from "express-async-handler";
import {registerUser} from "../controllers/register";


router.get("/register",(req,res) => {
    res.send("register user");
});


router.post('/register', registerUser)



module.exports = router;
