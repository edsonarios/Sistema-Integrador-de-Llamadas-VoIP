'use strict'

module.exports = function setupExtension(ExtensionModel, SalaModel) {

  async function create(id, obj) {
    const res = await SalaModel.findOne({
      where: {
        id
      }
    })

    if (res) {
      Object.assign(obj, { salaId: res.id })
      const result = await ExtensionModel.create(obj)
      return result.toJSON()
    }
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id
      }
    }

    const updated = await ExtensionModel.update(obj, cond)
    return updated
  }

  async function findById(id) {
    return await ExtensionModel.findOne({
      where: {
        id
      }
    })
  }
  async function findAll() {
    return ExtensionModel.findAll()
  }

  async function destroyAll(id) {
    return await ExtensionModel.destroy({
      where: {
        salaId: id
      }
    })
  }

  async function destroy(id) {
    return await ExtensionModel.destroy({
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
    destroy
  }
}