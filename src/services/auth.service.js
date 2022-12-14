import axios from 'axios';

const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
                process.env.VUE_APP_LOCAL_API_STRING
              : process.env.VUE_APP_REMOTE_API_STRING;

class AuthService {
  login(user) {
    return axios
      .post(API_PREFIX + 'auth/login?includeInfo=true', user)
      .then(response => {
        const accessToken = response.data.token.accessToken;
        const refreshToken = response.data.token.refreshToken;
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

  refreshJWT(refreshToken) {
    return axios.post(API_PREFIX + 'auth/refreshJWT', { refreshToken: refreshToken } ).then(
      (response) => {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        let user = JSON.parse(localStorage.getItem('user'));
        user['accessToken'] = accessToken;
        user['refreshToken'] = refreshToken;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      },
      (error) => {
        console.log(error);
        console.log("Token expired, logging out");
        localStorage.removeItem('user');
        return null;
      });
  }

  requestPasswordReset(email) {
    return axios.post(API_PREFIX + 'auth/request-password-reset', email );
  }

  /**
   * 
   * @param {email, password, verification code} params 
   * @returns 
   */
  confirmNewPassword(params) {
    return axios.post(API_PREFIX + 'auth/perform-password-reset', params );
  }
}

export default new AuthService();
