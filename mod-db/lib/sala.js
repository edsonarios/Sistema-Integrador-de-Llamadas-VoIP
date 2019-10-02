'use strict'

module.exports = function setupSala (SalaModel, UsuarioModel) {
    async function create (id, sala) {
      const usuario = await SalaModel.findOne({
        where: { id }
      })
  
      if (usuario) {
        Object.assign(sala, { usuarioId: usuario.id })
        const result = await SalaModel.create(sala)
        return result.toJSON()
      }
    }
  async function updateSala (id, sala) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await SalaModel.update(sala, cond)
    return updated
  }

  async function findById(salaId){
    return await SalaModel.findAll({
      where: {
        salaId: salaId
      }
    }) 
  }
  async function findOne(id){
    return SalaModel.findAll({
      where: {
        id
      }
    })
  }
  async function findOne2(id){
    return SalaModel.findOne({
      where: {
        id
      }
    })
  }
  async function destroyAll(id){
    return await SalaModel.destroy({
      where: {
        salaId: id
      }
    })
  }

  async function destroy(id){
    return await SalaModel.destroy({
      where: {
        id
      }
    })
  }
  return {
    create,
    updateSala,
    findById,
    findOne,
    findOne2,
    destroyAll,
    destroy
  }
}