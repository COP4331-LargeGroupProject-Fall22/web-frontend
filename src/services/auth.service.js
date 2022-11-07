import axios from 'axios';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;

class AuthService {
  login(user) {
    return axios
      .post(API_PREFIX + 'auth/login', user)
      .then(response => {
        const token = response.data.data.accessToken;
        if (!token) {
          return null;
        }

        return axios
          .get(API_PREFIX + 'user', { headers: { "Authorization": token } })
          .then(response => {
            let userData = response.data.data;
            userData['accessToken'] = token;
            localStorage.setItem('user', JSON.stringify(userData));

            return userData;
          });
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_PREFIX + 'auth/register', user);
  }
}

export default new AuthService();