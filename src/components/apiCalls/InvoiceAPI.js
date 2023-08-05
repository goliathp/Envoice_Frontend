import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/';

const listInvoice = async () => {
  const invList = await axios.get(API_URL + 'list_invoice');
  return invList.data;
};

const saveInvoice = async (invData) => {
  const saveInv = await axios.post(API_URL + 'create_invoice', invData);
  if (saveInv.data) {
    console.log('Invoice Saved');
  }
};
export { listInvoice, saveInvoice };
