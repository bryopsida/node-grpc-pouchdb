/** @module services/cat */

class CatService {
  /**
     * @param {module:repositories/cat.CatRepository} catRepository
     */
  constructor (catRepository) {
    this._repo = catRepository
  }
}

module.exports = {
  CatService
}
