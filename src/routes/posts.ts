import express from 'express'
import PostController from '../controllers/post'

const router = express.Router()
const Controller = new PostController()

router.get('/', Controller.getAllPosts)

router.post('/', Controller.createPost)

router.delete('/:id', Controller.deletePost)

export default router