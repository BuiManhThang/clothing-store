import { Schema, model } from 'mongoose'

const userTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  refreshToken: { type: String, required: true },
  refreshTokenExpire: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

const UserToken = model('userToken', userTokenSchema)
export default UserToken
