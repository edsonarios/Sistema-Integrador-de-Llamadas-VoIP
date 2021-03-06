"use strict";

module.exports = function setupSip(SipModel, UsuarioModel) {
  async function create(id, obj) {
    const res = await UsuarioModel.findOne({
      where: {
        id,
      },
    });

    if (res) {
      Object.assign(obj, { usuarioId: res.id });
      const result = await SipModel.create(obj);
      return result.toJSON();
    }
  }

  async function createRadio(obj) {
    const result = await SipModel.create(obj);
    return result.toJSON();
  }

  async function update(id, obj) {
    const cond = {
      where: {
        id,
      },
    };

    const updated = await SipModel.update(obj, cond);
    return updated;
  }

  async function updateForNumber(name, obj) {
    const cond = {
      where: {
        name,
      },
    };

    const updated = await SipModel.update(obj, cond);
    return updated;
  }
  async function updatesipCont(context, obj) {
    const cond = {
      where: {
        context,
      },
    };
    const updated = await SipModel.update(obj, cond);
    return updated;
  }

  async function findById(id) {
    return await SipModel.findOne({
      where: {
        id,
      },
    });
  }
  async function findAll() {
    return SipModel.findAll();
  }

  async function findLastSip(query) {
    return SipModel.findOne(query);
  }

  async function destroyAll(id) {
    return await SipModel.destroy({
      where: {
        salaId: id,
      },
    });
  }

  async function destroy(usuarioId) {
    return await SipModel.destroy({
      where: {
        usuarioId,
      },
    });
  }

  async function destroy1(id) {
    return await SipModel.destroy({
      where: {
        id,
      },
    });
  }
  return {
    create,
    createRadio,
    update,
    updatesipCont,
    updateForNumber,
    findById,
    findLastSip,
    findAll,
    destroyAll,
    destroy,
    destroy1,
  };
};
