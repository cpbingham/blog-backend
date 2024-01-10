import { Request, Response } from "express"
import { Post } from "../models"

export default class UserController {
    public async createPost(req: Request, res: Response) {
        try {
            const post: Post = new Post()
            post.title = req.body.title
            post.body = req.body.body
            await post.save()

            res.status(201).json({
                status: 'ok',
                message: 'created',
                data: post
            })
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'internal_server_error',
                errors: error
            })
        }
    }

    public async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await Post.find()
            res.status(200).json({
              status: "ok",
              message: "created",
              data: posts,
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