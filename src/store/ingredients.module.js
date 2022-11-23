import IngredientService from '../services/ingredient.service';

export const ingredients = {
  namespaced: true,
  actions: {
    get({ commit }, query) {
      return IngredientService.get(query).then(
        response => {
          return Promise.resolve(response);
        },
        error => {
          commit('getFailure');
          return Promise.reject(error);
        }
      );
    },
    getAllMatchingQuery({ commit }, query) {
      // TODO(37): Either 1) update response to have some indication of
      // totalNumPages for the given query or totalNumResults or 2) query
      // for pagename+1 and return a bool indicating if there are more
      // results past the current page.
      return IngredientService.getAllMatchingQuery(query).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          commit('getFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    getFailure(state) {
      console.log("failure retrieving ingredients, endpoint: " + state);
    },
  }
};
