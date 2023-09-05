import jwt from 'jsonwebtoken'
import { getAccessTokenKey } from '../utils/authUtil.js'

export const authorize = (req, res, next) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer ')) return res.sendStatus(401)
    const authorizationArr = req.headers.authorization.split(' ')
    if (authorizationArr.length !== 2) return res.sendStatus(401)
    const accessToken = authorizationArr[1]
    const decodedData = jwt.verify(accessToken, getAccessTokenKey())
    req.body.authorizationObject = decodedData
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
