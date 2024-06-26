import express, { response } from 'express'
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "does not contain email or password" })
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            res.status(400).json({ error: "there is no user by this email, please try to register first" })
        }

        //check the password
        const expectedHash = authentication(user.authentication.salt, password)
        if (user.authentication.password != expectedHash) {
            return res.status(403).json({ error: "wrong password try again" })
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();
        res.cookie('Navi-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })
        return res.status(200).json(user).end();
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(400);

        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        })
        return res.status(200).json(user).end()
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);

    }

}