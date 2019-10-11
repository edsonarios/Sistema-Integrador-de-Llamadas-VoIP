'use strict'

module.exports = function setupCdr (CdrModel, UsuarioModel) {
  async function findAll() {
    return CdrModel.findAll()
  }

  async function findById(id){
    return await CdrModel.findAll({
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
    findById,
    findAll,
    destroyAll,
    destroy
  }
}