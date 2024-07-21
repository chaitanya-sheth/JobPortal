import express from "express";
import { createJobController, getAllJobsController, updateJobController } from "../controller/jobsController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/create-job",userAuth, createJobController)

router.get("/get-jobs", userAuth, getAllJobsController)
router.put("/update-job/:id",userAuth,updateJobController)
export default router