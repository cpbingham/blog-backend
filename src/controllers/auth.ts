import { Request, Response } from "express";
import { User } from "../models/user";
import { getSaltAndHash, isPasswordValid } from "../utils/auth";

export default class AuthController {
    public async register(req: Request, res: Response) {
        try {
            const {username, email, password} = req.body
    
            if (!username) {
                return res.status(400).json({message: `username can't be blank`})
            }
            if (!email) {
                return res.status(400).json({message: `email can't be blank`})
            }
            if (!password) {
                return res.status(400).json({message: `password can't be blank`})
            }

            const existingUsername = await User.findOneBy({email: email})

            if (existingUsername) {
                return res.status(400).json({message: 'username is taken'})
            }

            const existingEmail = await User.findOneBy({username: username})
            if (existingEmail) {
                return res.status(400).json({message: 'email is already in use'})
            }

            const newUser: User = new User()
            const {salt, hash} = getSaltAndHash(password)
            newUser.username = username
            newUser.email = email
            newUser.salt = salt
            newUser.hash = hash
            await newUser.save() 
            
            res.status(201).json({
                status: 'ok',
                message: 'created',
                data: newUser
            })
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'internal_server_error',
                errors: error
            })
        }
    }

    public async login(req: Request, res: Response) {
        const {username, password} = req.body
 
        if(!username) {
            return res.status(400).json({message: `username can't be blank`})
        }
        if(!password) {
            return res.status(400).json({message: `password can't be blank`})
        }

        const user = await User.findOneBy({username: username})
        if (!user) {
            return res.status(400).json({message: `username and/or password is incorrect`})
        }
        const salt = user.salt
        const hash = user.hash
        const passwordMatch = isPasswordValid(password, {salt, hash})
        if (!passwordMatch) {
            return res.status(400).json({message: `username and/or password is incorrect`})
        }
        return res.json({user})
    }
}