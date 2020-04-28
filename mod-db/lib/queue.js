'use strict'

module.exports = function setupQueue (QueueModel, SalaModel) {
  async function create (id, queue) {
    const sala = await SalaModel.findOne({
      where: { id }
    })

    if (sala) {
      Object.assign(queue, { salaId: sala.id ,context:sala.nombreSala})
      const result = await QueueModel.create(queue)
      return result.toJSON()
    }
  }
  async function update (id, queue) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await QueueModel.update(queue, cond)
    return updated
  }

  async function findById(salaId){
    return await QueueModel.findOne({
      where: {
        salaId: salaId
      }
    }) 
  }

  async function findAll(id){
    return QueueModel.findAll()
  }
  async function destroyAll(id){
    return await QueueModel.destroy({
      where: {
        salaId: id
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
    update,
    findById,
    findAll,
    destroyAll,
    destroy
  }
}