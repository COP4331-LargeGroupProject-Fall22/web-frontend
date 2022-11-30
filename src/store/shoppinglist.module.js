import ShoppingListService from '../services/shoppinglist.service.js';

export const shoppinglist = {
  namespaced: true,
  actions: {
    getAll({ commit }, params) {
      return ShoppingListService.getAll(params).then(
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
      return ShoppingListService.post(newFood).then(
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
      return ShoppingListService.get(id).then(
        response => {
          return Promise.resolve(response);
        },
        error => {
          commit('failure', error);
          return Promise.reject(error);
        }
      );
    },

    put({ commit }, id, updatedItem) {
      return ShoppingListService.put(id, updatedItem).then(
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
      return ShoppingListService.delete(id).then(
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
      console.log("Failure in shopping list service, state: " + JSON.stringify(
        state) + ", error: " + error);
    },
  }
};
