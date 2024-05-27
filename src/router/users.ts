import express from 'express'

import { getAllUsers, deleteUser } from '../controllers/users'
import { isAuth } from '../middlewares'



export default (router: express.Router) => {
    router.get('/users', isAuth, getAllUsers)
    router.delete('/users/:id', deleteUser)
}