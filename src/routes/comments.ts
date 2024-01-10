import express from 'express'
import CommentController from '../controllers/comment'

const router = express.Router()
const Controller = new CommentController()

router.get('/', Controller.getAllComments)

router.post('/', Controller.createComment)


export default router 