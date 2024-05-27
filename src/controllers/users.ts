import express from 'express'
import { getUsers } from '../db/users'

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers()
        return res.status(200).json(user)
    }

    catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}