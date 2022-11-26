export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    // TODO(add num): Refresh JWT token if needed
    if (user && user.accessToken) {
      return { 'Authorization': user.accessToken.token };       // for Node.js Express back-end
    } else {
      return {};
    }
  }
