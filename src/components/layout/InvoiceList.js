import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { listInvoice } from '../apiCalls/InvoiceAPI';

const InvoiceList = () => {
  // const API_URL = process.env.REACT_APP_API_URL + '/api/';
  const [getInvoices, setInvoices] = useState();

  // const listInvoice = async () => {
  //   const invList = await axios.get(API_URL + 'list_invoice');
  //   setInvoices(invList.data);
  // };

  // const key = 'invoice_no';
  // const value = 1;
  // const checkKeyAndValue = (key, value) => {
  //   for (const inv of getInvoices.inv) {
  //     if (inv[key] === value) {
  //       return true;
  //     }
  //     return false;
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invList = await listInvoice();
        setInvoices(invList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const createInvoice = () => {
    console.log(getInvoices);
  };
  return (
    <div className='container'>
      <div className='row'>
        {getInvoices &&
          getInvoices.inv.map((inv) => (
            <div class='list-group' key={inv.invoice_no}>
              <Link
                to={`/update_invoice/${inv.invoice_no}`}
                class='list-group-item list-group-item-action flex-column align-items-start'
              >
                <div class='d-flex w-100 justify-content-between'>
                  <h5 class='mb-1'>Invoice No. {inv.invoice_no}</h5>
                  <small>{inv.invoice_date}</small>
                </div>
                <p class='mb-1'>
                  {inv.site}
                  {inv.clients}
                </p>
                <small>
                  {inv.sites}
                  {inv.job_items[0].description}
                </small>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InvoiceList;
