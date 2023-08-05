import axios from 'axios';
import { useEffect } from 'react';
import { React, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateClient = () => {
  const { client_comp } = useParams();
  const API_CLIENTS = process.env.REACT_APP_API_URL;

  const [getClient, setClient] = useState({
    client_email: '',
    client_company: '',
    client_address: '',
    client_abn: '',
    client_phone: '',
  });

  const [formData, setFormData] = useState({
    client_email: '',
    client_company: '',
    client_address: '',
    client_abn: '',
    client_phone: '',
  });
  const {
    client_email,
    client_company,
    client_address,
    client_abn,
    client_phone,
  } = formData;
  //   console.log(client_comp);

  const GetClient = async () => {
    const fetchClient = await axios.get(
      API_CLIENTS + `/api/list_clients/${client_comp}`
    );
    setClient(fetchClient.data);
    console.log(fetchClient.data);
  };

  useEffect(() => {
    GetClient();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const onChange = (e, index) => {
    const updatedClient = [...getClient.client_search_company];
    updatedClient[index] = {
      ...updatedClient[index],
      [e.target.name]: e.target.value,
    };
    console.log(updatedClient[index]);
    setClient({ ...getClient, client_search_company: updatedClient });
  };
  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)}>
        {getClient &&
          getClient.client_search_company &&
          getClient.client_search_company.map((client, index) => (
            <div key={index}>
              <div class='form-group'>
                <label for='client_email'>Client Email</label>
                <input
                  type='email'
                  class='form-control'
                  id='client_email'
                  name='client_email'
                  value={client.client_email}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Enter Client Email'
                />
              </div>
              <div class='form-group'>
                <label for='client_name'>Client Name</label>
                <input
                  type='name'
                  class='form-control'
                  id='client_name'
                  name='client_company'
                  value={client.client_company}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter Company Name'
                />
              </div>
              <div class='form-group'>
                <label for='client_address'>Client Address</label>
                <input
                  type='name'
                  class='form-control'
                  id='client_address'
                  name='client_address'
                  value={client.client_address}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter Company Address'
                />
              </div>
              <div class='form-group'>
                <label for='client_abn'>Client ABN</label>
                <input
                  type='name'
                  class='form-control'
                  id='client_abn'
                  name='client_abn'
                  value={client.client_abn}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter Client ABN'
                />
              </div>
              <div class='form-group'>
                <label for='client_phone'>Client Phone</label>
                <input
                  type='name'
                  class='form-control'
                  id='client_phone'
                  name='client_phone'
                  value={client.client_phone}
                  onChange={(e) => onChange(e)}
                  placeholder='Enter Client Phone'
                />
              </div>

              <button type='submit'>Update Client</button>
            </div>
          ))}
      </form>
    </div>
  );
};

export default UpdateClient;
