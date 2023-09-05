import mongoose from 'mongoose'

export const connectMongodb = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/clothing-store', {})
    console.log('Connect to mongoDb success')
  } catch (error) {
    console.log(error)
  }
}
