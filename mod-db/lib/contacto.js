'use strict'

module.exports = function setupContacto(ContactoModel, UsuarioModel) {

  async function create(id, obj) {
    const res = await UsuarioModel.findOne({
      where: {
        id
      }
    })

    if (res) {
      Object.assign(obj, { usuarioId: res.id })
      const result = await ContactoModel.create(obj)
      return result.toJSON()
    }
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id
      }
    }

    const updated = await ContactoModel.update(obj, cond)
    return updated
  }

  async function findById(id) {
    return await ContactoModel.findOne({
      where: {
        id
      }
    })
  }
  async function findAll() {
    return ContactoModel.findAll()
  }

  async function destroyAll(id) {
    return await ContactoModel.destroy({
      where: {
        salaId: id
      }
    })
  }

  async function destroy(id) {
    return await ContactoModel.destroy({
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