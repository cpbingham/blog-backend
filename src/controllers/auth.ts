import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entity/user.entity";

const register = async (req: Request, res: Response) => {
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

    const existingUsername = await myDataSource.getRepository(User).findOneBy({username: username})
    
    if (existingUsername) {
        return res.status(400).json({message: 'username is taken'})
    }

    const existingEmail = await myDataSource.getRepository(User).findOneBy({email: email})
    if (existingEmail) {
        return res.status(400).json({message: 'email is already in use'})
    }

    const newUser = await myDataSource.getRepository(User).create({
        username,
        email,
        password
    })
    const results = await myDataSource.getRepository(User).save(newUser)

    return res.json({results})

}

export {register}