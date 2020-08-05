"use strict";

module.exports = function setupAgenda(AgendaModel, UsuarioModel) {
  async function create(id, obj) {
    const res = await UsuarioModel.findOne({
      where: {
        id,
      },
    });

    if (res) {
      Object.assign(obj, { usuarioId: res.id });
      const result = await AgendaModel.create(obj);
      return result.toJSON();
    }
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id,
      },
    };

    const updated = await AgendaModel.update(obj, cond);
    return updated;
  }

  async function findById(id) {
    return await AgendaModel.findOne({
      where: {
        id,
      },
    });
  }
  async function findAll() {
    return AgendaModel.findAll();
  }

  async function findAllOrder() {
    return AgendaModel.findAll({
      order: [["id", "ASC"]],
    });
  }

  async function findAllQuery(query) {
    return AgendaModel.findAll(query);
  }

  async function destroyAll(id) {
    return await AgendaModel.destroy({
      where: {
        salaId: id,
      },
    });
  }

  async function destroy(id) {
    return await AgendaModel.destroy({
      where: {
        id,
      },
    });
  }
  return {
    create,
    update,
    findAllOrder,
    findById,
    findAll,
    destroyAll,
    findAllQuery,
    destroy,
  };
};
