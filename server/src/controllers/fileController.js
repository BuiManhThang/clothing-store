import BaseController from './baseController.js'

class FileController extends BaseController {
  constructor(service) {
    super(service)
  }

  upload = (req, res) => {
    try {
      const result = this.service.upload(req.files)
      return this.success(res, result)
    } catch (error) {
      return this.serverError(res, error)
    }
  }
}

export default FileController
