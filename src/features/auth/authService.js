import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const API_URL = '/api/';

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register_user', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login_user', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const logout = () => {
  localStorage.removeItem('user');
};

const loadUser = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
};

//Creating CSV for Invoices
const create_csv = async (csvData) => {
  const response = await axios.post(API_URL + 'create_csv', csvData);
  if (response) {
    // localStorage.setItem('csv_data', JSON.stringify(response.data));
    console.log('Went Through IF');
  }
  return response;
};

const authService = { register, login, logout, create_csv, loadUser };

export default authService;
