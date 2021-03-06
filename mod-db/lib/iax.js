'use strict'

module.exports = function setupIax(IaxModel, UsuarioModel) {

  async function create(id, obj) {
    const res = await UsuarioModel.findOne({
      where: {
        id
      }
    })

    if (res) {
      Object.assign(obj, { usuarioId: res.id })
      const result = await IaxModel.create(obj)
      return result.toJSON()
    }
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id
      }
    }

    const updated = await IaxModel.update(obj, cond)
    return updated
  }

  async function updateiaxCont(context, obj) {
    const cond = {
      where: {
        context
      }
    }
    const updated = await IaxModel.update(obj, cond)
    return updated
  }

  async function findById(id) {
    return await IaxModel.findOne({
      where: {
        id
      }
    })
  }
  async function findAll() {
    return IaxModel.findAll()
  }

  async function destroyAll(id) {
    return await IaxModel.destroy({
      where: {
        salaId: id
      }
    })
  }

  async function destroy(usuarioId) {
    return await IaxModel.destroy({
      where: {
        usuarioId
      }
    })
  }

  async function destroy1(id) {
    return await IaxModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    update,
    updateiaxCont,
    findById,
    findAll,
    destroyAll,
    destroy,
    destroy1
  }
}