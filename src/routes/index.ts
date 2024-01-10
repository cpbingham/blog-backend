import express from 'express'

import {default as UserRouter} from './users'
import {default as PostRouter} from './posts'
import {default as CommentRouter} from './comments'
import {default as AuthRouter} from './auth'

const router = express.Router()

router.use('/users', UserRouter)
router.use('/posts', PostRouter)
router.use('/comments', CommentRouter)
router.use('/auth', AuthRouter)

export default router