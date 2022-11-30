import ShoppingListService from '../services/shoppinglist.service';

export const inventory = {
  namespaced: true,
  actions: {
    getAll({ commit }, params) {
      return ShoppingList.getAll(params).then(
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
      return ShoppingList.post(newFood).then(
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
      return ShoppingList.get(id).then(
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
      return ShoppingList.put(id, updatedItem).then(
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
      return ShoppingList.delete(id).then(
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
