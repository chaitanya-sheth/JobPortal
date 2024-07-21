import jobsModel from "../models/jobsModel.js";

export const createJobController = async (req,res,next) => {

    const {company, position} = req.body;

    if(!company || !position){
        return next("please provide all fields")
    }

    // console.log(req)
    req.body.createdBy = req.user.userId;

    const job = await jobsModel.create(req.body)
    res.status(201).json({job})
    
}

export const getAllJobsController = async (req,res,next) => {

    const jobs = await jobsModel.find({createdBy:req.user.userId})
    
    res.status(200).json({
        totalJobs: jobs.length,
        jobs
    })
}

export const updateJobController = async(req,res,next) => {
    const {id} = req.params
    const {company,position} = req.body

    if(!company || !position){
        return next("Job not found")
    }

    const job = jobsModel.findOne({_id:id})

    if(!job){
        return next("JOb not found")
    }

    if(req.user.userId === job.createdBy.toString()){
        return next("You are not authorized user to update this")
    }

    const updateJob = await jobsModel.findOneAndUpdate({_id:id}, req.body, {
        new:true
    }) 

    res.status(200).json({updateJob})


}