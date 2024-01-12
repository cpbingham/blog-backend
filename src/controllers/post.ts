import { Request, Response } from "express"
import { Post } from "../models"

export default class UserController {
    public async createPost(req: Request, res: Response) {
        try {
            const post: Post = new Post()
            post.title = req.body.title
            post.body = req.body.body
            post.userId = req.body.userId
            post.user = req.body.userId
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
        const page = Number(req.query.page) || 1
        const itemPerPage = Number(req.query.itemPerPage) || 10

        try {
            const postsAndCount = await Post.findAndCount({
              skip: (page - 1) * itemPerPage,
              take: itemPerPage 
            })
            res.status(200).json({
              status: "ok",
              message: "created",
              data: postsAndCount,
            })
          } catch (error) {
            res.status(500).json({
              status: "failed",
              message: "internal_server_error",
              errors: error,
            })
          }
    }

    public async deletePost(req: Request, res: Response) {
      try {
          const post = await Post.findOneBy({ id: parseInt(req.params.id) })
          if (!post) {                
              res.status(400).json({
                  status: 'not_found',
                  message: 'post not found'
              })
              return
          }    
          
          await post.softRemove()
          res.status(200).json({
              status: "ok",
              message: "deleted",
              data: post
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