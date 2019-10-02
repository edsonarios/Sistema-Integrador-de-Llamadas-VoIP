'use strict'

module.exports = function setupvoiceMail (voiceMailModel, UsuarioModel) {
  async function create (id, voiceMail) {
    const usuario = await voiceMailModel.findOne({
      where: { id }
    })

    if (usuario) {
      Object.assign(voiceMail, { usuarioId: usuario.id })
      const result = await voiceMailModel.create(voiceMail)
      return result.toJSON()
    }
  }
  async function updatevoiceMail (id, voiceMail) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await voiceMailModel.update(voiceMail, cond)
    return updated
  }

  async function findById(usuarioId){
    return await voiceMailModel.findAll({
      where: {
        usuarioId: usuarioId
      }
    }) 
  }
  async function findOne(id){
    return voiceMailModel.findAll({
      where: {
        id
      }
    })
  }
  async function findOne2(id){
    return voiceMailModel.findOne({
      where: {
        id
      }
    })
  }
  async function destroyAll(id){
    return await voiceMailModel.destroy({
      where: {
        usuarioId: id
      }
    })
  }

  async function destroy(id){
    return await voiceMailModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    updatevoiceMail,
    findById,
    findOne,
    findOne2,
    destroyAll,
    destroy
  }
}