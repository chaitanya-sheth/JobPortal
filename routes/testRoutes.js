import express from "express";
import { testPostController } from "../controller/testPostController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/test-post",userAuth,testPostController)

export default router; 