import express from 'express'
import { getUserController, updateUserController } from '../controller/userController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()

//get user data
router.post("/getUser",userAuth,getUserController)

router.put("/update-user",userAuth,updateUserController)

export default router