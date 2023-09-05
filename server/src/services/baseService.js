export default class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  /**
   * @param {object} entity
   * @returns Created entity
   */
  create = async (entity) => {
    const newEntity = new this.repository(entity)
    const createdEntity = await newEntity.save()
    return createdEntity
  }

  /**
   * @param {object} oldEntity
   * @param {string} id
   * @param {object} newEntity
   * @returns Updated entity
   */
  update = async (id, oldEntity, newEntity) => {
    const updatedEntity = oldEntity
    Object.assign(updatedEntity, newEntity)
    updatedEntity.updatedAt = Date.now()
    await this.repository.replaceOne({ _id: id }, updatedEntity)
    return updatedEntity
  }

  /**
   * @param {string} entityId
   */
  delete = async (entityId) => {
    await this.repository.deleteOne({ _id: entityId })
  }

  /**
   * @param {string[]} entityIds
   */
  deleteMany = async (entityIds) => {
    await this.repository.deleteMany({ _id: { $in: entityIds } })
  }

  /**
   * @param {string} entityId
   */
  getById = async (entityId) => {
    const entity = await this.repository.findById(entityId)
    return entity
  }

  getAll = async () => {
    const entities = await this.repository.find()
    return entities
  }
}
