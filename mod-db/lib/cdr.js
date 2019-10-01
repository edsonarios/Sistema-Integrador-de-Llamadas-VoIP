'use strict'

module.exports = function setupCdr (CdrModel, UsuarioModel) {
  async function create (id, cdr) {
    const usuario = await UsuarioModel.findOne({
      where: { id }
    })

    if (usuario) {
      Object.assign(cdr, { usuarioId: usuario.id })
      const result = await CdrModel.create(cdr)
      return result.toJSON()
    }
  }
  async function updateCdr (id, cdr) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await CdrModel.update(cdr, cond)
    return updated
  }

  async function findById(usuarioId){
    return await CdrModel.findAll({
      where: {
        usuarioId: usuarioId
      }
    }) 
  }
  async function findOne(id){
    return CdrModel.findAll({
      where: {
        id
      }
    })
  }
  async function findOne2(id){
    return CdrModel.findOne({
      where: {
        id
      }
    })
  }
  async function destroyAll(id){
    return await CdrModel.destroy({
      where: {
        usuarioId: id
      }
    })
  }

  async function destroy(id){
    return await CdrModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    updateCdr,
    findById,
    findOne,
    findOne2,
    destroyAll,
    destroy
  }
}