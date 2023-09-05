import ValidateError from '../entities/validateError.js'

class BaseController {
  constructor(service) {
    this.service = service
  }

  getAll = async (_, res) => {
    try {
      const entities = await this.service.getAll()
      return this.success(res, entities)
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  getById = async (req, res) => {
    try {
      const id = req.params.id
      const entity = await this.service.getById(id)
      if (!entity) return this.notFound(res)
      return this.success(res, entity)
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  create = async (req, res) => {
    try {
      const savedEntity = await this.service.create(req.body)
      return this.created(res, savedEntity)
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  update = async (req, res) => {
    try {
      const id = req.params.id
      const entity = await this.service.getById(id)
      if (!entity) return this.notFound(res)
      const updatedEntity = await this.service.update(id, entity, req.body)
      return this.success(res, updatedEntity)
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  delete = async (req, res) => {
    try {
      const id = req.params.id
      const entity = await this.service.getById(id)
      if (!entity) return this.notFound(res)
      await this.service.delete(id)
      return this.noContent(res)
    } catch (error) {
      return this.handleError(res, error)
    }
  }

  success = (res, data) => {
    return res.status(200).json(data)
  }

  noContent = (res) => {
    return res.sendStatus(204)
  }

  created = (res, data) => {
    return res.status(201).json(data)
  }

  notFound = (res) => {
    return res.sendStatus(404)
  }

  clientError = (res, data) => {
    return res.status(400).json(data)
  }

  serverError = (res, data) => {
    console.log(data)
    return res.status(500).json(data)
  }

  handleError = (res, error) => {
    if (error instanceof ValidateError) return this.clientError(res, error)
    return this.serverError(res, error)
  }
}

export default BaseController
