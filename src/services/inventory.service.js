import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;
const API_URL = API_PREFIX + 'user/inventory';

class InventoryService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  post(newFood) {
    return axios.post(API_URL, newFood, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + "/" + id, { headers: authHeader() });
  }

  put(id, updatedFood) {
    return axios.get(API_URL + "/" + id, updatedFood, { headers: authHeader() });
  }
  
  delete(id) {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
  }
}

export default new InventoryService();
