import express from 'express'

import { getAllUsers, deleteUser, updateUser } from '../controllers/users'
import { isAuth, isOwner } from '../middlewares'




export default (router: express.Router) => {
    router.get('/users', isAuth, getAllUsers)
    router.delete('/users/:id', isAuth, isOwner, deleteUser)
    router.patch('/users/:id', isAuth, isOwner, updateUser)
}