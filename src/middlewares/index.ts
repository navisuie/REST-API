import express from 'express'
import { get, merge } from 'lodash'
import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params
        const currentUserId = get(req, 'identity._id') as string
        if (!currentUserId) {
            return res.status(403).send("this id does not exist")
        }

        if (currentUserId.toString() != id) {
            return res.status(403).send("you cannot delete a diffrent user")

        }
        next()
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }

}

export const isAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['Navi-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserBySessionToken(sessionToken)
        if (!existingUser) {
            return res.sendStatus(400)
        }

        merge(req, { identity: existingUser })

        return next();
    }
    catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}