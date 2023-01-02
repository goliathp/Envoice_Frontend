import axios from 'axios';

const API_URL = '/api/';

//Creating CSV for Invoices
const create_csv = async (csvData) => {
  const response = await axios.post(API_URL + 'create_csv', csvData);
  if (response) {
    // localStorage.setItem('csv_data', JSON.stringify(response.data));
    console.log('Went Through IF');
  }
  return response;
};

const invService = { create_csv };

export default invService;
