"use strict";

module.exports = function setupUsuario(UsuarioModel, SalaModel) {
  async function create(id, obj) {
    const res = await SalaModel.findOne({
      where: {
        id,
      },
    });

    if (res) {
      Object.assign(obj, { salaId: res.id });
      const result = await UsuarioModel.create(obj);
      return result.toJSON();
    }
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id,
      },
    };

    const updated = await UsuarioModel.update(obj, cond);
    return updated;
  }

  async function findById(id) {
    return await UsuarioModel.findOne({
      where: {
        id,
      },
    });
  }
  async function findAll() {
    return UsuarioModel.findAll();
  }

  async function findAllOrder() {
    return UsuarioModel.findAll({
      order: [["nombre", "ASC"]],
    });
  }

  async function findOneCorreo(obj) {
    return await UsuarioModel.findOne({
      where: {
        correo: obj,
      },
    });
  }

  async function destroyAll(id) {
    return await UsuarioModel.destroy({
      where: {
        salaId: id,
      },
    });
  }

  async function destroy(id) {
    return await UsuarioModel.destroy({
      where: {
        id,
      },
    });
  }
  return {
    create,
    update,
    findById,
    findAllOrder,
    findAll,
    findOneCorreo,
    destroyAll,
    destroy,
  };
};
