import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectMongodb } from './src/db/connectMongodb.js'
import morgan from 'morgan'
import cookieParse from 'cookie-parser'

import userRouter from './src/routes/userRouter.js'
import authRouter from './src/routes/authRouter.js'
import fileRouter from './src/routes/fileRouter.js'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
connectMongodb()

app.use(morgan('dev'))
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
)
app.use(express.static('public'))
app.use(cookieParse())
app.use(express.urlencoded())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`))
