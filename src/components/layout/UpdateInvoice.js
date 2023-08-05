import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { saveInvoice } from '../apiCalls/InvoiceAPI';

const UpdateInvoice = () => {
  const API_URL = process.env.REACT_APP_API_URL + '/api/register_company';
  const API_URL_PDF = process.env.REACT_APP_API_URL + '/api/pdf_generator';
  const API_URL_CLIENTS = process.env.REACT_APP_API_URL + '/api/list_clients';

  const { invoice_no } = useParams();
  const API_URL_INVOICE = process.env.REACT_APP_API_URL + '/api/list_invoice';

  const [getInvData, setInvData] = useState({ inv: [] });
  const [getClient, setClients] = useState({ clients: [] });
  const [showClient, setShowClient] = useState();
  const [showClientDetails, setClientDetails] = useState({
    client_search_company: [],
  });
  const [clientName, setClientName] = useState();
  const [compDetails, setCompDetails] = useState({ companies: [] });
  const GST = 10;
  const [showAddRow, setShowAddRow] = useState(true);
  const [showDownload, setShowDownload] = useState(true);

  const [rows, setRows] = useState([]);

  const getInvoice = async () => {
    try {
      const invoice = await axios.get(API_URL_INVOICE + `/${invoice_no}`);
      setInvData(invoice.data);
      const { job_items, ...invoiceData } = invoice.data.inv[0];
      setRows(job_items);
      setClientName(invoiceData.clients);
    } catch (error) {
      console.error(error);
    }
  };

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
  //   console.log(...rows);

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

  const getCompany = async () => {
    try {
      // const timestamp = new Date().getTime();
      const fetchData = await axios.get(API_URL);
      setCompDetails(fetchData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClients = async () => {
    try {
      const clients = await axios.get(API_URL_CLIENTS);
      setClients(clients.data);
      // console.log(clients.data);
    } catch (error) {
      console.error(error);
    }
  };
  const searchClient = async (val) => {
    try {
      if (val) {
        const clients = await axios.get(API_URL_CLIENTS + `/${val}`);
        setClientDetails(clients.data);
      } else {
        return;
      }
      // console.log(clients.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    saveInvoice(combinedDetails);
  };

  useEffect(() => {
    getCompany();
    getClients();
    getInvoice();
    setShowClient(clientName);
    searchClient(clientName);
  }, [clientName]);

  const calcSubtotal = () => {
    return rows.reduce(
      (accumulator, currentValue) =>
        accumulator + parseFloat(currentValue.amount || 0),
      0
    );
  };
  const subtotal = calcSubtotal();
  const salesTax = (subtotal * (10 / 100)).toFixed(2);
  const total = (subtotal + subtotal * (10 / 100)).toFixed(2);

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

  return (
    // <></>

    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col'>
            <center>
              <h1 className='mb-4'>Tax Invoice</h1>
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
            <h4>Invoice Info:</h4>
            <p className='mb-1'>Invoice Number: {invoice_no}</p>
            <p className='mb-1'>Date: {dateHelper(currentDate)}</p>
            <p className='mb-1'>Due Date: {dateHelper(dueDate)}</p>
          </div>
        </div>
        {compDetails &&
          compDetails.companies.map((company) => (
            <div class='row'>
              <div class='col-7' key={company._id}>
                <h5>Bill From:</h5>
                <p className='mb-1'>{company.company_address}</p>
                <p className='mb-1'>ABN: {company.company_abn}</p>
                <p className='mb-1'>+61-{company.company_phone}</p>
                <p className='mb-1'>{company.company_email}</p>
              </div>

              <div>
                <h5>Bill To:</h5>

                {showAddRow && (
                  <select
                    value={showClient}
                    onChange={async (e) => {
                      setShowClient(e.target.value);
                      searchClient(e.target.value);
                    }}
                  >
                    {!showClient && <option>Select your client</option>}
                    {/* {showClient && <option>{showClient}</option>} */}
                    {getClient &&
                      getClient.clients.map((client) => (
                        <option className='mb-1'>
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
            {compDetails &&
              compDetails.companies &&
              compDetails.companies.map((company) => (
                <div class='col-9' key={company._id}>
                  <h4>Payment Details:</h4>
                  <p>{company.company_name}</p>
                  <p>BSB: {company.company_bsb}</p>
                  <p>Account No.: {company.company_accNo}</p>
                </div>
              ))}

            <div class='col'>
              <p>Subtotal: ${calcSubtotal()}</p>
              <p>GST: {GST}%</p>
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
        {showDownload && <button onClick={handleSave}>Save To Database</button>}
      </form>
    </div>
  );
};

export default UpdateInvoice;
