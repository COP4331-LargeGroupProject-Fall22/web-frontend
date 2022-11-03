import axios from 'axios';

// TODO: update this to the correct URL
const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  login(user) {
    var params = new URLSearchParams();
    params.append('username', user.username);
    params.append('password', user.password);

    return axios
      .post(API_URL + 'login', params)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    var params = new URLSearchParams();
    params.append('firstName', 'foo');
    params.append('lastName', 'bar');
    params.append('username', user.username);
    params.append('email', user.email);
    params.append('password', user.password);

    return axios.post(API_URL + 'register', params);
  }
}

export default new AuthService();