import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;
const API_URL = API_PREFIX + 'recipes';

class RecipeService {
  async getAll(params) {
    const header = await authHeader();
    // TODO(): After Mikhail finishes refactor, add auth header back in here
    return (header === null) ? null : axios.get(API_URL, { params: params });
  }

  async get(id) {
    const header = await authHeader();
    return (header === null) ? null : axios.get(API_URL + "/" + id, { headers: header });
  }
}

export default new RecipeService();
