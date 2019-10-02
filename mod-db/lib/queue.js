'use strict'

module.exports = function setupQueue (QueueModel, UsuarioModel) {
  async function create (id, queue) {
    const usuario = await QueueModel.findOne({
      where: { id }
    })

    if (usuario) {
      Object.assign(queue, { usuarioId: usuario.id })
      const result = await QueueModel.create(queue)
      return result.toJSON()
    }
  }
  async function updateQueue (id, queue) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await QueueModel.update(queue, cond)
    return updated
  }

  async function findById(usuarioId){
    return await QueueModel.findAll({
      where: {
        usuarioId: usuarioId
      }
    }) 
  }
  async function findOne(id){
    return QueueModel.findAll({
      where: {
        id
      }
    })
  }
  async function findOne2(id){
    return QueueModel.findOne({
      where: {
        id
      }
    })
  }
  async function destroyAll(id){
    return await QueueModel.destroy({
      where: {
        usuarioId: id
      }
    })
  }

  async function destroy(id){
    return await QueueModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    updateQueue,
    findById,
    findOne,
    findOne2,
    destroyAll,
    destroy
  }
}