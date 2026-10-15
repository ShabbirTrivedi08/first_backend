import express from "express"
import {addUser,getUser,getSingleUser,deleteUSer, login} from "../controller/userDataController.js"

const router = express.Router()

router.post('/api/add-user',addUser)
router.get('/api/get-user',getUser)
router.get('/api/get-singleuser/:uid',getSingleUser)
router.delete('/api/delete-user/:uid',deleteUSer)
router.post('/api/login',login)


export default router