import express from 'express'
import UserController from '../controllers/users'

const router = express.Router()
const Controller = new UserController()

router.get('/', Controller.getAllUsers)

router.post('/', Controller.createUser)

export default router