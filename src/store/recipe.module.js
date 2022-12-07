import RecipeService from '../services/recipe.service.js';

export const recipe = {
  namespaced: true,
  actions: {
    getAll({ commit }, params) {
      return RecipeService.getAll(params).then(
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
      return RecipeService.get(id).then(
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
