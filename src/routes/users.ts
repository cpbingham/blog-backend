import express from 'express'
import { Request, Response } from 'express'
import { User } from '../entity/user.entity'
import { myDataSource } from '../app-data-source'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

router.post('/', async(req: Request, res: Response) => {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    res.json(results)
})

export {router as Users}