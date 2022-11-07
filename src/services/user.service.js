// import axios from 'axios';
// import authHeader from './auth-header';

// const API_PREFIX = process.env.VUE_APP_NODE_ENV === process.env.VUE_APP_DEV ?
//                 process.env.VUE_APP_LOCAL_API_STRING
//               : process.env.VUE_APP_REMOTE_API_STRING;
// const API_URL = API_PREFIX + 'api/test/';
// console.log(API_URL);

// class UserService {
//   getPublicContent() {
//     return axios.get(API_URL + 'all');
//   }

//   getUserBoard() {
//     return axios.get(API_URL + 'user', { headers: authHeader() });
//   }

//   getModeratorBoard() {
//     return axios.get(API_URL + 'mod', { headers: authHeader() });
//   }

//   getAdminBoard() {
//     return axios.get(API_URL + 'admin', { headers: authHeader() });
//   }
// }

// export default new UserService();
