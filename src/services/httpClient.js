import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:7777/treditor/',
});

httpClient.interceptors.request.use(function(config) {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    config.headers.Authorization = 'Bearer ' + user.accessToken;
  }

  return config;
});

export default httpClient;
