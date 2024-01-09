import express from 'express'
import { Request, Response } from 'express'
import { Post } from '../entity/post.entity'
import { myDataSource } from '../app-data-source'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const posts = await myDataSource.getRepository(Post).find()
    res.json(posts)
})

router.post('/', async(req: Request, res: Response) => {
    const post = await myDataSource.getRepository(Post).create(req.body)
    const results = await myDataSource.getRepository(Post).save(post)
    return res.send(results)
})


export {router as Posts}  