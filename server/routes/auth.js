import express from "express";

const router = express.Router();
import asyncHandler from "express-async-handler";


router.get("/register",(req,res) => {
    res.send("register user");
});


router.get('/test/:id', asyncHandler(async (req, res, next) => {
	// const bar = await foo.findAll();
	res.send(req.params.id)
}))




module.exports = router;
