import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  code: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String },
  phoneNumber: { type: String },
  role: { type: String, enum: ['ADMIN', 'USER', 'EMPLOYEE'], default: 'USER' },
  password: { type: String, required: true },
  avatar: { type: String, default: 'avatar' },
  address: {
    city: { type: String, default: '' },
    district: { type: String, default: '' },
    detail: { type: String, default: '' },
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

const User = model('User', userSchema)
export default User
