import httpClient from './httpClient';

const API_URL = 'api/test/';

class UserService {
  getPublicContent() {
    return httpClient.get(API_URL + 'all');
  }

  getUserBoard() {
    return httpClient.get(API_URL + 'user');
  }

  getModeratorBoard() {
    return httpClient.get(API_URL + 'mod');
  }

  getAdminBoard() {
    return httpClient.get(API_URL + 'admin');
  }
}

export default new UserService();
