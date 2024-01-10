import express from 'express'
import AuthController from '../controllers/auth'

const router = express.Router()
const Controller = new AuthController()

router.post('/register', Controller.register)
router.post('/login', Controller.login)

export default router