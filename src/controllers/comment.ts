import { Request, Response } from "express"
import { Comment } from "../models"

export default class CommentController {
    public async createComment(req: Request, res: Response) {
        try {
            const comment: Comment = new Comment()
            comment.body = req.body.body
            await comment.save()

            res.status(201).json({
                status: 'ok',
                message: 'created',
                data: comment
            })
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'internal_server_error',
                errors: error
            })
        }
    }

    public async getAllComments(req: Request, res: Response) {
        try {
            const comments = await Comment.find()
            res.status(200).json({
              status: "ok",
              message: "created",
              data: comments,
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