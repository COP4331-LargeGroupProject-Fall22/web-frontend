import axios from 'axios';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;
const API_URL = API_PREFIX + 'ingredients';

class IngredientService {
  getAllMatchingQuery(query) {
    return axios.get(API_URL, { params: query });
  }

  get(query) {
    return axios.get(API_URL, { params: query });
  }
}

export default new IngredientService();
