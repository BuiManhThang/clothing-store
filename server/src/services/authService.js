import BaseService from './baseService.js'
import ValidateError from '../entities/validateError.js'
import { validateEmail, validatePassword, validateRequire } from '../utils/validateUtil.js'
import { generateNewCode } from '../utils/functionUtil.js'
import { getRefreshTokenKey, generateAccessToken, generateToken } from '../utils/authUtil.js'
import MyError from '../entities/myError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthService extends BaseService {
  constructor(userTokenRepository, userRepository) {
    super(userTokenRepository)
    this.userRepository = userRepository
  }

  register = async (registerData) => {
    const { email, password, confirmPassword } = registerData

    const errorList = []
    if (!validateRequire(email))
      errorList.push(new MyError('email', 'Email không được để trống', email))
    else if (!validateEmail(email))
      errorList.push(new MyError('email', 'Email sai định dạng', email))
    else {
      const existedEmail = await this.userRepository.findOne({ email })
      if (existedEmail)
        errorList.push(new MyError('email', 'Email đã tồn tại trong hệ thống', email))
    }

    if (!validateRequire(password))
      errorList.push(new MyError('password', 'Mật khẩu không được để trống', password))
    else if (!validatePassword(password))
      errorList.push(
        new MyError('password', 'Mật khẩu phải có ít nhất 6 ký tự bao gồm chữ và số', password)
      )

    if (!validateRequire(confirmPassword))
      errorList.push(
        new MyError('confirmPassword', 'Xác nhận mật khẩu không được để trống', confirmPassword)
      )
    else if (password !== confirmPassword)
      errorList.push(
        new MyError('confirmPassword', 'Xác nhận mật khẩu phải trùng với mật khẩu', confirmPassword)
      )

    if (errorList.length) throw new ValidateError(errorList)

    const hashPassword = await bcrypt.hash(password, 10)
    const userName = this.getUserNameFromEmail(email)
    const userCode = await this.getNewUserCode()

    const newUser = this.userRepository({
      code: userCode,
      name: userName,
      email: email,
      password: hashPassword,
    })

    const savedUser = await newUser.save()
    const { accessToken, refreshToken, refreshTokenExpire } = generateToken(
      savedUser._id,
      savedUser.role
    )

    console.log(savedUser._id, refreshToken, refreshTokenExpire)
    await this.create({
      userId: savedUser._id,
      refreshToken,
      refreshTokenExpire,
    })

    delete savedUser.password

    return {
      userInfo: savedUser,
      accessToken,
      refreshToken,
    }
  }

  signIn = async (signInData) => {
    const { email, password } = signInData

    const user = await this.userRepository.findOne({ email })
    if (!user) throw new ValidateError([new MyError('email', 'Sai email hoặc mật khẩu', email)])

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new ValidateError([new MyError('email', 'Sai email hoặc mật khẩu', email)])

    const { accessToken, refreshToken, refreshTokenExpire } = generateToken(user._id, user.role)

    await this.create({
      userId: user._id,
      refreshToken,
      refreshTokenExpire,
    })

    delete user.password

    return {
      userInfo: user,
      accessToken,
      refreshToken,
    }
  }

  signOut = async (userId, refreshToken) => {
    const userToken = await this.repository.findOne({ userId, refreshToken })
    if (userToken) await this.repository.deleteOne({ userId, refreshToken })
  }

  generateAccessToken = async (refreshToken) => {
    if (!refreshToken)
      throw new ValidateError([
        new MyError('refreshToken', 'Refresh token không hợp lệ', refreshToken),
      ])
    const userToken = await this.repository.findOne({ refreshToken })
    if (!userToken)
      throw new ValidateError([
        new MyError('refreshToken', 'Không tìm thấy refresh token', refreshToken),
      ])
    const refreshTokenExpire = new Date(userToken.refreshTokenExpire)
    if (refreshTokenExpire < Date.now())
      throw new ValidateError([new MyError('refreshToken', 'Refresh Token hết hạn', refreshToken)])
    console.log(refreshToken, getRefreshTokenKey())
    const decodedData = jwt.verify(refreshToken, getRefreshTokenKey())
    const newAccessToken = generateAccessToken(decodedData.userId, decodedData.role)
    return newAccessToken
  }

  getUserNameFromEmail = (email) => {
    const emailArr = email.split('@')
    if (!emailArr.length) return ''
    return emailArr[0]
  }

  getNewUserCode = async () => {
    const users = await this.userRepository.find().sort({ code: -1 }).limit(1)
    if (!users.length) return 'U.0001'
    return generateNewCode(users[0].code)
  }
}

export default AuthService
