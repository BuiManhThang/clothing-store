import { getRefreshTokenExpire } from '../utils/authUtil.js'
import BaseController from './baseController.js'

class AuthController extends BaseController {
  constructor(service) {
    super(service)
  }

  register = async (req, res) => {
    try {
      const result = await this.service.register(req.body)
      const { userInfo, accessToken, refreshToken } = result
      res.cookie('refresh-token', refreshToken, {
        maxAge: Date.now() + getRefreshTokenExpire() * 1000,
        httpOnly: true,
        secure: true,
      })
      return this.success(res, { userInfo, accessToken })
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  signIn = async (req, res) => {
    try {
      const result = await this.service.signIn(req.body)
      const { userInfo, accessToken, refreshToken } = result
      res.cookie('refresh-token', refreshToken, {
        maxAge: Date.now() + getRefreshTokenExpire() * 1000,
        httpOnly: true,
        secure: true,
      })
      return this.success(res, { userInfo, accessToken })
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  signOut = async (req, res) => {
    try {
      const refreshToken = req.cookies['refresh-token']
      await this.service.signOut(req.body.authorizationObject.userId, refreshToken)
      res.clearCookie('refresh-token')
      return this.noContent(res)
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  generateAccessToken = async (req, res) => {
    try {
      const refreshToken = req.cookies['refresh-token']
      const accessToken = await this.service.generateAccessToken(refreshToken)
      return this.success(res, accessToken)
    } catch (error) {
      return this.handleError(res, error)
    }
  }
}

export default AuthController
