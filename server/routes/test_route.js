import express from "express";

const router = express.Router();
import asyncHandler from "express-async-handler";
import {get_async_test, get_async_test_wrapper} from "../controllers/test_controller";

// using normal try and block
router.get('/template', get_async_test)

// using wrapper
router.get('/template/wrapper', asyncHandler(get_async_test_wrapper));

module.exports = router;
