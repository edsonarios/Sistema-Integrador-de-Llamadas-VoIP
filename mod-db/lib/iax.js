'use strict'

module.exports = function setupIax (IaxModel, UsuarioModel) {
  async function create (id, iax) {
    const usuario = await IaxModel.findOne({
      where: { id }
    })

    if (usuario) {
      Object.assign(iax, { usuarioId: usuario.id })
      const result = await IaxModel.create(iax)
      return result.toJSON()
    }
  }
  async function updateIax (id, iax) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await IaxModel.update(iax, cond)
    return updated
  }

  async function findById(usuarioId){
    return await IaxModel.findAll({
      where: {
        usuarioId: usuarioId
      }
    }) 
  }
  async function findOne(id){
    return IaxModel.findAll({
      where: {
        id
      }
    })
  }
  async function findOne2(id){
    return IaxModel.findOne({
      where: {
        id
      }
    })
  }
  async function destroyAll(id){
    return await IaxModel.destroy({
      where: {
        usuarioId: id
      }
    })
  }

  async function destroy(id){
    return await IaxModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    updateIax,
    findById,
    findOne,
    findOne2,
    destroyAll,
    destroy
  }
}