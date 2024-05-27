import express from 'express'
import { getUsers, deleteUserById, updateUserById, getUserById } from '../db/users'


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

        return res.send('user by ' + id + ' has been deleted')
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.body
        const { id } = req.params
        if (!username) {
            return res.sendStatus(400)
        }
        const user = await getUserById(id)

        user.username = username;
        await user.save()

        return res.status(200).json(user).end
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}
