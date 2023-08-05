import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AddClient = () => {
  const API_CLIENTS = process.env.REACT_APP_API_URL;
  const [getClients, setClients] = useState({ clients: [] });
  const GetClients = async () => {
    const fetchClient = await axios.get(API_CLIENTS + '/api/list_clients');
    console.log(fetchClient.data);
    setClients(fetchClient.data);
  };
  useEffect(() => {
    GetClients();
  }, []);
  return (
    <div className='container'>
      <div className='row'>
        <div>Add your clients here!</div>
        {getClients &&
          getClients.clients.map((client) => (
            <div key={client._id}>
              <Link to={`/update_client/${client.client_company}`}>
                {client.client_company}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddClient;
