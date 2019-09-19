'use strict'

module.exports = function setupExtensions (ExtensionsModel) {
  async function createOrUpdate (agent) {
    

    const result = await ExtensionsModel.create(agent)
    return result.toJSON()
  }

  async function updateExtensionsPassword (id, extensions) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await ExtensionsModel.update(extensions, cond)
    return updated
  }
  
  async function updateExtensions (id, extensions) {
    const cond = {
      where: {
        id
      }
    }
    
    const updated = await ExtensionsModel.update(extensions, cond)
    return updated
  }

 async function findOne (agent){
      return await ExtensionsModel.findOne({
          where:{
              correo: agent
          }
      })
  }
  
  async function findUno (id){
    return await ExtensionsModel.findOne({
        where:{
            id
        }
    })
}

  function findAll(){
    return ExtensionsModel.findAll()
  }

  async function findUser(user){
    return await ExtensionsModel.findAll({
      where: {
          tipo:user
      },
      order:[[
        'ap_paterno','ASC'
      ]]
    })
    
  }

  async function findUs(extensionsId){
    return await ExtensionsModel.findAll({
      where: {
        id: extensionsId 
      }
    }) 
  }

  function eliminarUsu(extensionsId){ 
    const userid = ExtensionsModel.findAll({
      where: {
        id: extensionsId
      }
    })
    
    user.destroy()
  }
  async function destroy(extensionsId){ 
    return await ExtensionsModel.destroy({
      where:{ 
        id: extensionsId
      }
    })
 }
 
  
  return {
    createOrUpdate,
    updateExtensionsPassword,
    updateExtensions,
    findAll,
    findOne,
    findUno,
    findUser,
    eliminarUsu,
    findUs,
    destroy
  }
}
