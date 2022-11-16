import axios from 'axios';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;
const API_URL = API_PREFIX + 'ingredients';

class IngredientService {
  getAllMatchingQuery(ingredientName, page=undefined, resultsPerPage=resultsPerPage, intolerance=undefined) {
    return axios.get(API_URL, {
        // TODO(add num): response should have some indication of totalNumPages
        // for the given requestName or totalNumResults
        params: {
            ingredientName: ingredientName,
            resultsPerPage: resultsPerPage,
            page: page,
            intolerance: intolerance
        }
    });
  }

  get(ingredientID, quantity=undefined, unit=undefined) {
    return axios.get(API_URL, {
        params: {
            ingredientID: ingredientID,
            quantity: quantity,
            unit: unit
        }
    });
  }
}

export default new IngredientService();
