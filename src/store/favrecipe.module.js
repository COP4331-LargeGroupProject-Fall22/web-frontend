import FavoriteRecipeService from '../services/favrecipe.service.js';

export const favrecipe = {
  namespaced: true,
  actions: {
    getAll({ commit }) {
      return FavoriteRecipeService.getAll().then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          commit('failure', error);
          return Promise.reject(error);
        }
      );
    },

    post({ commit }, newRecipe) {
      return FavoriteRecipeService.post(newRecipe).then(
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
      return FavoriteRecipeService.get(id).then(
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
      return FavoriteRecipeService.delete(id).then(
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
