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
        try {
            const users = await User.find()
            res.status(200).json({
              status: "ok",
              message: "created",
              data: users,
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