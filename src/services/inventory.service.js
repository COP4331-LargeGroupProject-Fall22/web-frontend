import axios from 'axios';
import authHeader from './auth-header';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;
const API_URL = API_PREFIX + 'user/inventory';

class InventoryService {
  async getAll(params) {
    const header = await authHeader();
    return (header === null) ? null : axios.get(API_URL, { headers: header, params: params });
  }

  async post(newFood) {
    const header = await authHeader();
    return (header === null) ? null : axios.post(API_URL, newFood, { headers: header });
  }

  async get(id) {
    const header = await authHeader();
    return (header === null) ? null : axios.get(API_URL + "/" + id, { headers: header });
  }

  async put(id, updatedFood) {
    const header = await authHeader();
    return (header === null) ? null : axios.get(API_URL + "/" + id, updatedFood, { headers: header });
  }

  async delete(id) {
    const header = await authHeader();
    return (header === null) ? null : axios.delete(API_URL + "/" + id, { headers: header });
  }
}

export default new InventoryService();
