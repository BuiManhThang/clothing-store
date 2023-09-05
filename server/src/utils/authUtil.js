import jwt from 'jsonwebtoken'

export const getAccessTokenExpire = () => process.env.ACCESS_TOKEN_EXPIRE || 900
export const getRefreshTokenExpire = () => process.env.REFRESH_TOKEN_EXPIRE || 259200
export const getAccessTokenKey = () => process.env.ACCESS_TOKEN_KEY || 'ACCESS_TOKEN_KEY'
export const getRefreshTokenKey = () => process.env.REFRESH_TOKEN_KEY || 'REFRESH_TOKEN_KEY'

export const generateToken = (userId, userRole) => {
  const refreshTokenExpireDate = new Date(Date.now() + getRefreshTokenExpire() * 1000)
  const accessToken = generateAccessToken(userId, userRole)
  const refreshToken = generateRefreshToken(userId, userRole)

  return { accessToken, refreshToken, refreshTokenExpire: refreshTokenExpireDate }
}

export const generateAccessToken = (userId, userRole) => {
  const accessToken = jwt.sign({ userId, userRole }, getAccessTokenKey(), {
    expiresIn: getAccessTokenExpire(),
  }) // 15m
  return accessToken
}

export const generateRefreshToken = (userId, userRole) => {
  const refreshToken = jwt.sign({ userId, userRole }, getRefreshTokenKey(), {
    expiresIn: getRefreshTokenExpire(),
  }) // 3d
  return refreshToken
}
