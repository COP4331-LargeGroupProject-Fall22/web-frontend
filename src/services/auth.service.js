import axios from 'axios';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;
console.log(API_PREFIX);

class AuthService {
  login(user) {
    var params = new URLSearchParams();
    params.append('username', user.username);
    params.append('password', user.password);

    return axios
      .post(API_PREFIX + 'auth/login', params)
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
            localStorage.setItem('user', JSON.stringify(response.data.data));

            return response.data;
          });
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    var params = new URLSearchParams();
    params.append('firstName', user.firstName);
    params.append('lastName', user.lastName);
    params.append('username', user.username);
    params.append('email', user.email);
    params.append('password', user.password);

    return axios.post(API_PREFIX + 'auth/register', params);
  }
}

export default new AuthService();