import AuthService from "@/services/auth.service.js"

export default async function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  // Refresh JWT token if needed
  if (Date.now() > user.accessToken.expirationDate) {
    console.log('Refreshing tokens');
    user = await AuthService.refreshJWT(user.refreshToken.token);
  }

  if (user && user.accessToken) {
    return { 'Authorization': user.accessToken.token };
  } else {
    return {};
  }
}
