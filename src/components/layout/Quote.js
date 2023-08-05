import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCompany, getClients } from '../apiCalls/UserAPI';
import { listInvoice } from '../apiCalls/InvoiceAPI';

const Quote = () => {
  const API_URL_PDF = process.env.REACT_APP_API_URL + '/api/pdf_generator';
  const API_URL_CLIENTS = process.env.REACT_APP_API_URL + '/api/list_clients';

  const [getClient, setClients] = useState({ clients: [] });
  const [showClient, setShowClient] = useState();
  const [showClientDetails, setClientDetails] = useState({
    client_search_company: [],
  });
  const [compDetails, setCompDetails] = useState({ companies: [] });
  const [GST, setGST] = useState(10);
  const [showAddRow, setShowAddRow] = useState(true);
  const [showDownload, setShowDownload] = useState(true);
  const [rows, setRows] = useState([
    {
      description: '',
      quantity: 0,
      price: 0,
      amount: 0,
    },
  ]);
  const [invoice_no, setInvoiceNo] = useState();

  const handleInputChange = (event, rowIndex) => {
    const updatedRow = {
      ...rows[rowIndex],
      [event.target.name]: event.target.value,
    };

    const updatedRows = [
      ...rows.slice(0, rowIndex),
      updatedRow,
      ...rows.slice(rowIndex + 1),
    ];
    setRows(updatedRows);
  };
  // console.log(...rows);

  const handleChange = (event) => {
    setGST(event.target.value);
  };

  const handleInvoiceNoChange = (e) => {
    setInvoiceNo(e.target.value);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      { description: '', quantity: '', price: '', amount: '' },
    ]);
  };

  const handleRemoveRow = (rowIndex) => {
    const updatedRows = [
      ...rows.slice(0, rowIndex),
      ...rows.slice(rowIndex + 1),
    ];
    setRows(updatedRows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setShowAddRow(false);
    console.log(rows); // Do something with the submitted rows
  };

  const handlePreview = () => {
    setShowAddRow(false);
    console.log(rows); // Do something with the submitted rows
  };

  const handleEdit = () => {
    setShowAddRow(true);
  };

  const handleDownload = async () => {
    await setShowAddRow(false);
    await setShowDownload(false);
    try {
      const reactCode = document.documentElement.outerHTML;
      const response = await axios.post(
        API_URL_PDF,
        { reactCode },
        {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'blob',
        }
      );
      const pdfUrl = URL.createObjectURL(response.data);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setShowAddRow(true);
    setShowDownload(true);
  };

  // const getClients = async () => {
  //   try {
  //     const clients = await axios.get(API_URL_CLIENTS);
  //     setClients(clients.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    //Fetching data from UserAPI.js
    const fetchData = async () => {
      try {
        //getting company details
        const company = await getCompany();
        setCompDetails(company);
        //getting and listing client details
        const client = await getClients();
        setClients(client);
        //getting invoice length
        const invList = await listInvoice();
        setInvoiceNo(invList.inv.length + 1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const searchClient = async (val) => {
    try {
      const clients = await axios.get(API_URL_CLIENTS + `/${val}`);
      setClientDetails(clients.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calcSubtotal = () => {
    return rows.reduce(
      (account, current) => account + parseFloat(current.amount || 0),
      0
    );
  };
  const subtotal = calcSubtotal();
  const salesTax = (subtotal * (GST / 100)).toFixed(2);
  const total = (subtotal + subtotal * (GST / 100)).toFixed(2);

  const dateHelper = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = new Date();

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);

  const combinedDetails = {
    clients: showClient,
    invoice_no: invoice_no,
    invoice_date: dateHelper(currentDate),
    invoice_dueDate: dateHelper(dueDate),
    job_items: [...rows],
    gst: GST,
    sales_tax: salesTax,
    total_amount: total,
  };
  console.log(combinedDetails);
  return (
    // <></>

    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col'>
            <center>
              <h1 className='mb-4'>Quote</h1>
            </center>
          </div>
        </div>

        <div className='row'>
          {compDetails &&
            compDetails.companies &&
            compDetails.companies.map((company) => (
              <div className='col-9' key={company._id}>
                <img src={company.company_logo} width='90' />
                <div className='mb-3'>
                  <h4>{company.company_name} </h4>
                  <i>{company.company_description}</i>
                </div>
              </div>
            ))}

          <div class='col'>
            <p className='mb-1'>
              Quote Number:{' '}
              <input
                value={invoice_no}
                onChange={handleInvoiceNoChange}
              ></input>
            </p>
            <p className='mb-1'>Date: {dateHelper(currentDate)}</p>
            {/* <p className='mb-1'>Due Date: {dateHelper(dueDate)}</p> */}
          </div>
        </div>
        {compDetails &&
          compDetails.companies.map((company) => (
            <div class='row'>
              <div class='col-7' key={company._id}>
                <h5>Quote From:</h5>
                <p className='mb-1'>{company.company_address}</p>
                <p className='mb-1'>ABN: {company.company_abn}</p>
                <p className='mb-1'>+61-{company.company_phone}</p>
                <p className='mb-1'>{company.company_email}</p>
              </div>

              <div>
                <h5>Quote To:</h5>

                {showAddRow && (
                  <select
                    onChange={async (e) => {
                      setShowClient(e.target.value);
                      searchClient(e.target.value);
                    }}
                  >
                    {showClient && <option>{showClient}</option>}
                    {!showClient && <option>Select your client</option>}
                    {getClient &&
                      getClient.clients.map((client) => (
                        <option className='mb-1' value={client.client_company}>
                          {client.client_company}
                        </option>
                      ))}
                  </select>
                )}
                {!showAddRow && showClient}
                {showClientDetails &&
                  showClientDetails.client_search_company &&
                  showClientDetails.client_search_company.map((client) => (
                    <div key={client._id}>
                      <p className='mb-1'>{client.client_address}</p>
                      <p className='mb-1'>ABN: {client.client_abn}</p>
                      <p className='mb-1'>+61-{client.client_phone}</p>
                      <p className='mb-1'>{client.client_email}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        <div className='row'>
          <div className='col'>
            <table className='table table-striped table-bordered table-hover mt-4'>
              <thead>
                <tr>
                  <th>#</th>

                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{rowIndex + 1}</td>
                    <td>
                      {showAddRow && (
                        <input
                          type='text'
                          name='description'
                          value={row.description}
                          onChange={(event) =>
                            handleInputChange(event, rowIndex)
                          }
                          className='form-control'
                        />
                      )}
                      {!showAddRow && row.description}
                    </td>
                    <td>
                      {showAddRow && (
                        <input
                          type='text'
                          name='quantity'
                          value={row.quantity}
                          onChange={(event) =>
                            handleInputChange(event, rowIndex)
                          }
                          className='form-control'
                        />
                      )}
                      {!showAddRow && row.quantity}
                    </td>
                    <td>
                      {showAddRow && (
                        <input
                          type='text'
                          name='price'
                          value={row.price}
                          onChange={(event) =>
                            handleInputChange(event, rowIndex)
                          }
                          className='form-control'
                        />
                      )}
                      {!showAddRow && row.price}
                    </td>
                    <td>
                      {showAddRow && (
                        <input
                          type='text'
                          name='amount'
                          value={(row.amount = row.quantity * row.price)}
                          onChange={(event) =>
                            handleInputChange(event, rowIndex)
                          }
                          className='form-control'
                          disabled
                        />
                      )}
                      {!showAddRow && row.amount}
                    </td>
                    {showAddRow && (
                      <td>
                        <button
                          type='button'
                          onClick={() => handleRemoveRow(rowIndex)}
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}

                {/* <tr>
                <td>Item 2</td>
                <td>2</td>
                <td>$20.00</td>
                <td>$40.00</td>
              </tr>
              <tr>
                <td>Item 3</td>
                <td>3</td>
                <td>$30.00</td>
                <td>$90.00</td>
              </tr> */}
              </tbody>
            </table>
            {showAddRow && <button onClick={handleAddRow}>Add Row</button>}
          </div>
        </div>

        <div class='container text-left'>
          <div class='row'>
            <div class='col'>
              <p>Subtotal: ${calcSubtotal()}</p>
              <p>
                GST%:
                <input
                  type='text'
                  name='GST'
                  value={GST}
                  onChange={handleChange}
                />
              </p>
              <p>Sales Tax: ${salesTax}</p>
              <p>Total: ${total}</p>
            </div>
          </div>
        </div>
        {showAddRow ? (
          <button onClick={handlePreview}>Preview</button>
        ) : (
          showDownload && <button onClick={handleEdit}>Edit</button>
        )}
        {showDownload && <button onClick={handleDownload}>Download</button>}
        {showDownload && <button>Send Mail</button>}
      </form>
    </div>
  );
};

export default Quote;
