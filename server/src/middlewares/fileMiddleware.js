import multer from 'multer'
import { parse } from 'path'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${process.cwd()}/public/images/temp`)
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const fileObject = parse(file.originalname)
    const extFileName = fileObject.ext
    const fileName = `${uniqueSuffix}${extFileName}`
    callback(null, fileName)
  },
})

export const upload = multer({ storage })
