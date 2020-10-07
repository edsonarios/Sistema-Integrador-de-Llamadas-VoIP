"use strict";

module.exports = function setupPrivilegios(PrivilegiosModel, UsuarioModel) {
  async function create(id, obj) {
    const res = await UsuarioModel.findOne({
      where: {
        id,
      },
    });

    if (res) {
      Object.assign(obj, { usuarioId: res.id });
      const result = await PrivilegiosModel.create(obj);
      return result.toJSON();
    }
  }
  async function update(id, obj) {
    const cond = {
      where: {
        id,
      },
    };

    const updated = await PrivilegiosModel.update(obj, cond);
    return updated;
  }

  async function findById(id) {
    return await PrivilegiosModel.findOne({
      where: {
        id,
      },
    });
  }
  async function findAll() {
    return PrivilegiosModel.findAll();
  }

  async function findAllQuery(query) {
    return PrivilegiosModel.findAll(query);
  }

  async function destroyAll(id) {
    return await PrivilegiosModel.destroy({
      where: {
        salaId: id,
      },
    });
  }

  async function destroy(id) {
    return await PrivilegiosModel.destroy({
      where: {
        id,
      },
    });
  }

  return {
    create,
    update,
    findById,
    findAll,
    destroyAll,
    findAllQuery,
    destroy,
  };
};
