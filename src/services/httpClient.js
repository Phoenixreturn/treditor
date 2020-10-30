import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:7777/treditor/',
});

httpClient.interceptors.request.use(function (config) {
  let user = JSON.parse(localStorage.getItem('user'));

  config.headers.Authorization =
    user && user.accessToken ? `Bearer ${user.accessToken}` : '';

  return config;
});

export default httpClient;
