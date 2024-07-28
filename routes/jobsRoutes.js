import express from "express";
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from "../controller/jobsController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/create-job",userAuth, createJobController)

router.get("/get-jobs", userAuth, getAllJobsController)
router.put("/update-job/:id",userAuth,updateJobController)
router.delete("/delete-job/:id", userAuth, deleteJobController)

router.get("/job-stats",userAuth, jobStatsController)
export default router