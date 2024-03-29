import { Request, Response } from "express"
import { Comment } from "../models"

export default class CommentController {
    public async createComment(req: Request, res: Response) {
        try {
            const comment: Comment = new Comment()
            comment.body = req.body.body
            comment.postId = req.body.postId
            comment.post = req.body.postId
            comment.userId = req.body.userId
            comment.user = req.body.userId
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

    public async deleteComment(req: Request, res: Response) {
      try {
          const comment = await Comment.findOneBy({ id: parseInt(req.params.id) })
          if (!comment) {                
              res.status(400).json({
                  status: 'not_found',
                  message: 'comment not found'
              })
              return
          }    
          
          await comment.softRemove()
          res.status(200).json({
              status: "ok",
              message: "deleted",
              data: comment
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