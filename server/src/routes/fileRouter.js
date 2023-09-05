import { Router } from 'express'
import FileService from '../services/fileService.js'
import FileController from '../controllers/fileController.js'
import { upload } from '../middlewares/fileMiddleware.js'

const fileService = new FileService()
const fileController = new FileController(fileService)

const fileRouter = Router()

fileRouter.post('/upload', upload.array('files'), fileController.upload)

export default fileRouter
