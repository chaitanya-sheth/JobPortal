import express from 'express'
import { updateUserController } from '../controller/userController.js'
import userAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router.put("/update-user",userAuth,updateUserController)

export default router