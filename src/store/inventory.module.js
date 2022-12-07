import InventoryService from '../services/inventory.service';

export const inventory = {
  namespaced: true,
  actions: {
    getAll({ commit }, params) {
      return InventoryService.getAll(params).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          commit('failure', error);
          return Promise.reject(error);
        }
      );
    },

    post({ commit }, newFood) {
      return InventoryService.post(newFood).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          commit('failure', error);
          return Promise.reject(error);
        }
      );
    },

    get({ commit }, id) {
      return InventoryService.get(id).then(
        response => {
          return Promise.resolve(response);
        },
        error => {
          commit('failure', error);
          return Promise.reject(error);
        }
      );
    },

    put({ commit }, params) {
      return InventoryService.put(params.id, params.exp).then(
        response => {
          return Promise.resolve(response);
        },
        error => {
          commit('failure', error);
          return Promise.reject(error);
        }
      );
    },

    delete({ commit }, id) {
      return InventoryService.delete(id).then(
        response => {
          return Promise.resolve(response);
        },
        error => {
          commit('failure', error);
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    failure(state, error) {
      console.log("Failure in inventory service, state: " + JSON.stringify(
        state) + ", error: " + error);
    },
  }
};
