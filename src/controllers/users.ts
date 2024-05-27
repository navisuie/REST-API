import express from 'express'
import { getUsers, deleteUserById } from '../db/users'


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

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserById(id)

        return res.json(deletedUser)
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}
