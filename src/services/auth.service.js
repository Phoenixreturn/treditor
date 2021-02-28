import httpClient from './httpClient';

const API_URL = 'api/auth/';

class AuthService {
  login(user) {
    return httpClient
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
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
    return httpClient.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
