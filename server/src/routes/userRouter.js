import { Router } from 'express'
import UserController from '../controllers/userController.js'
import UserService from '../services/userService.js'
import User from '../models/user.js'
import { authorize } from '../middlewares/authMiddleware.js'

const userService = new UserService(User)
const userController = new UserController(userService)

const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.get('/:id', userController.getById)
userRouter.get('/', authorize, userController.getAll)
userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.delete)

export default userRouter
