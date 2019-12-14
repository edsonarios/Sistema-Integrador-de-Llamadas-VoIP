'use strict'

module.exports = function setupSala(SalaModel) {

  async function create(obj) {
    const result = await SalaModel.create(obj)
    return result.toJSON()
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id
      }
    }

    const updated = await SalaModel.update(obj, cond)
    return updated
  }

  async function findById(id) {
    return await SalaModel.findOne({
      where: {
        id
      }
    })
  }
  async function findAll() {
    return SalaModel.findAll()
  }
  
  async function findAllQuery(query) {
    return SalaModel.findAll(query)
  }

  async function destroyAll(id) {
    return await SalaModel.destroy({
      where: {
        salaId: id
      }
    })
  }

  async function destroy(id) {
    return await SalaModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    update,
    findById,
    findAll,
    destroyAll,
    findAllQuery,
    destroy
  }
}