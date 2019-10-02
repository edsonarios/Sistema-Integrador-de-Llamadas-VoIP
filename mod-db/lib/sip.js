'use strict'

module.exports = function setupSip (SipModel, UsuarioModel) {
  async function create (id, sip) {
    const usuario = await SipModel.findOne({
      where: { id }
    })

    if (usuario) {
      Object.assign(sip, { usuarioId: usuario.id })
      const result = await SipModel.create(sip)
      return result.toJSON()
    }
  }
  async function updateSip (id, sip) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await SipModel.update(sip, cond)
    return updated
  }

  async function findById(usuarioId){
    return await SipModel.findAll({
      where: {
        usuarioId: usuarioId
      }
    }) 
  }
  async function findOne(id){
    return SipModel.findAll({
      where: {
        id
      }
    })
  }
  async function findOne2(id){
    return SipModel.findOne({
      where: {
        id
      }
    })
  }
  async function destroyAll(id){
    return await SipModel.destroy({
      where: {
        usuarioId: id
      }
    })
  }

  async function destroy(id){
    return await SipModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    updateSip,
    findById,
    findOne,
    findOne2,
    destroyAll,
    destroy
  }
}