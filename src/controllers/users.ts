import { Request, Response } from "express"
import { User } from "../models"

export default class UserController {
    public async createUser(req: Request, res: Response) {
        try {
            const user: User = new User()
            user.username = req.body.username
            user.email = req.body.email
            user.salt = '1234'
            user.hash = '1234'
            await user.save()

            res.status(201).json({
                status: 'ok',
                message: 'created',
                data: user
            })
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'internal_server_error',
                errors: error
            })
        }
    }

    public async getAllUsers(req: Request, res: Response) {
        const page = Number(req.query.page) || 1
        const itemPerPage = Number(req.query.itemPerPage) || 10

        try {
            const usersAndCount = await User.findAndCount({
                skip: (page - 1) * itemPerPage,
                take: itemPerPage
            })
            res.status(200).json({
              status: "ok",
              message: "created",
              data: usersAndCount[0],
              paging: {
                page: page,
                itemPerPage: itemPerPage,
                itemCount: usersAndCount[1],
                lastPage: Math.ceil(usersAndCount[1] / itemPerPage)
              }
            })
          } catch (error) {
            res.status(500).json({
              status: "failed",
              message: "internal_server_error",
              errors: error,
            })
          }
    }
}