'use strict'

module.exports = function setupVoicemail(VoicemailModel, UsuarioModel) {

  async function create(id, obj) {
    const res = await UsuarioModel.findOne({
      where: {
        id
      }
    })

    if (res) {
      Object.assign(obj, { usuarioId: res.id })
      const result = await VoicemailModel.create(obj)
      return result.toJSON()
    }
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id
      }
    }

    const updated = await VoicemailModel.update(obj, cond)
    return updated
  }

  async function findById(id) {
    return await VoicemailModel.findOne({
      where: {
        id
      }
    })
  }
  async function findAll() {
    return VoicemailModel.findAll()
  }

  async function destroyAll(id) {
    return await VoicemailModel.destroy({
      where: {
        salaId: id
      }
    })
  }

  async function destroy(id) {
    return await VoicemailModel.destroy({
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