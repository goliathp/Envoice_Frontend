import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/register_company';
const API_URL_CLIENTS = process.env.REACT_APP_API_URL + '/api/list_clients';

const getCompany = async () => {
  try {
    // const timestamp = new Date().getTime();
    const fetchData = await axios.get(API_URL);
    return fetchData.data;
  } catch (error) {
    console.log(error);
  }
};

const getClients = async () => {
  try {
    const clients = await axios.get(API_URL_CLIENTS);
    return clients.data;
  } catch (error) {
    console.error(error);
  }
};

export { getCompany, getClients };
