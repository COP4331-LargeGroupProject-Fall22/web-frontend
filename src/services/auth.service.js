import axios from 'axios';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;

class AuthService {
  login(user) {
    return axios
      .post(API_PREFIX + 'auth/login?includeInfo=true', user)
      .then(response => {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        if (!accessToken) {
          return null;
        }

        let user = response.data.userInfo;
        user['accessToken'] = accessToken;
        user['refreshToken'] = refreshToken;
        localStorage.setItem('user', JSON.stringify(user));

        return user;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_PREFIX + 'auth/register', user);
  }

  sendVerificationCode(username) {
    return axios.post(API_PREFIX + 'auth/send-verification-code', username);
  }

  confirmVerificationCode(user) {
    return axios.post(API_PREFIX + 'auth/confirm-verification-code', user);
  }

  // TODO(21): update code to refresh token when access token expires
  refreshJWT(refreshToken) {
    return axios.post(API_PREFIX + 'auth/refreshJWT', { refreshToken });
  }
}

export default new AuthService();
