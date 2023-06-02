import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/';
//Fetching Company details for Invoice creation

const create_invoice = async () => {
  const response = await axios.get(API_URL + 'register_company');
  // if (response.data) {
  //   localStorage.setItem('invData', JSON.stringify(response.data));
  // }
  return response.data;
};

const invService = { create_invoice };

export default invService;
