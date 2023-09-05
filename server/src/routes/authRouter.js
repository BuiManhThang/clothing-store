import { Router } from 'express'
import AuthController from '../controllers/authController.js'
import AuthService from '../services/authService.js'
import User from '../models/user.js'
import UserToken from '../models/userToken.js'
import { authorize } from '../middlewares/authMiddleware.js'

const authService = new AuthService(UserToken, User)
const authController = new AuthController(authService)

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/sign-in', authController.signIn)
authRouter.post('/sign-out', authorize, authController.signOut)
authRouter.post('/generate-access-token', authController.generateAccessToken)

export default authRouter
