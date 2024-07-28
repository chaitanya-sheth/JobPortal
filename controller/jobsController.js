import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
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

    const {status, search, sort} = req.query //fetching params from query on which we want to apply filter 

    //condition for searching filter
    const queryObject = {
        createdBy:req.user.userId
    }

    //logic filters
    if(status && status!== 'all'){
        queryObject.status = status
    }
    console.log(queryObject)  //it will find the object wich matches given status in query & also checks user auth
    
    if(search){
        queryObject.position = {$regex: search, $options:"i"}
    }
    let queryResult = jobsModel.find(queryObject) 

    if(sort === "latest"){
        queryResult = queryResult.sort("-createdAt");
    }

    if(sort === "oldest"){
        queryResult = queryResult.sort("createdAt")
    }

    if(sort === "a-z"){
        queryResult = queryResult.sort("position")
    }

    if(sort === "z-a"){
        queryResult = queryResult.sort("-position")
    }

    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const skip = (page-1) * limit

    queryResult = queryResult.skip(skip).limit(limit)

    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numofPage = Math.ceil(totalJobs/limit)

    const jobs = await queryResult
    
    // const jobs = await jobsModel.find({createdBy:req.user.userId})
    
    res.status(200).json({
        totalJobs: jobs.length,
        jobs,
        numofPage
    })
}

export const updateJobController = async(req,res,next) => {
    const {id} = req.params
    const {company,position} = req.body

    if(!company || !position){
        return next("Job not found")
    }

    const job = await jobsModel.findOne({_id:id})

    if(!job){
        return next("Job not found")
    }

    if(!req.user.userId === job.createdBy.toString()){
        return next("You are not authorized user to update this")
    }

    const updateJob = await jobsModel.findOneAndUpdate({_id:id}, req.body, {
        new:true,
        runValidators:true,
    }) 

    res.status(200).json({updateJob})
}

export const deleteJobController = async (req,res,next) => {

    const{id} = req.params;

    const job = await jobsModel.findOne({_id:id})

    if(!job){
        return next("Job not found")
    }

    if(!req.user.userId === job.createdBy.toString()){
        return next("You are not authorized user to delete this")
    }

    await jobsModel.deleteOne({ _id: id });
    res.status(200).json({message:'Success, Job Deleted'})
}

export const jobStatsController = async (req,res) => {

    const stats = await jobsModel.aggregate([
        {
        $match:{
            createdBy: new mongoose.Types.ObjectId(req.user.userId)
        },
        },
        {
            $group:{
                _id:"$status",
                count:{$sum:1}
            }
        }
    ]);

    //monthly application
    //monthly yearly stats

    let monthlyApplication = await jobsModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
          createdAt: { $type: 'date' } // Ensure createdAt is a valid date
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    
    console.log(monthlyApplication);
    
    res.status(200).json({ totallength:stats.length , stats, monthlyApplication})
}