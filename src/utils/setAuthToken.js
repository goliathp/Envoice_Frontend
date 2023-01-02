import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // axios.interceptors.request.use(
    //   (config) => {
    //     config.headers.authorization = `Bearer ${token}`;
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
