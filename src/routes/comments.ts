import express from 'express'
import { Request, Response } from 'express'
import { Comment } from '../entity/comment.entity'
import { myDataSource } from '../app-data-source'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const posts = await myDataSource.getRepository(Comment).find()
    res.json(posts)
})

router.post('/', async(req: Request, res: Response) => {
    const post = await myDataSource.getRepository(Comment).create(req.body)
    const results = await myDataSource.getRepository(Comment).save(post)
    return res.send(results)
})


export {router as Comments}  