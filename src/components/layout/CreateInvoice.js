import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateInvoice = () => {
  const API_URL = 'http://localhost:2000/api/register_company';
  const API_URL_PDF = 'http://localhost:2000/api/pdf_generator';

  const [compDetails, setCompDetails] = useState({ companies: [] });
  const GST = 10;
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

  const handleInputChange = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedRow = {
      ...rows[rowIndex],
      [name]: value,
    };

    const updatedRows = [
      ...rows.slice(0, rowIndex),
      updatedRow,
      ...rows.slice(rowIndex + 1),
    ];
    setRows(updatedRows);
  };
  // console.log(...rows);

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
      console.log(reactCode);
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
  useEffect(() => {
    getCompany();
  }, []);

  const calcSubtotal = () => {
    return rows.reduce(
      (account, current) => account + parseFloat(current.amount || 0),
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
            <p className='mb-1'>Invoice Number: 1</p>
            <p className='mb-1'>Date: {dateHelper(currentDate)}</p>
            <p className='mb-1'>Due Date: {dateHelper(dueDate)}</p>
          </div>
        </div>
        {compDetails &&
          compDetails.companies &&
          compDetails.companies.map((company) => (
            <div class='row'>
              <div class='col-7' key={company._id}>
                <h5>Bill From:</h5>
                <p className='mb-1'>{company.company_address}</p>
                <p className='mb-1'>ABN: {company.company_abn}</p>
                <p className='mb-1'>+61-{company.company_phone}</p>
                <p className='mb-1'>{company.company_email}</p>
              </div>

              <div class='col' key={company._id}>
                <h5>Bill To:</h5>
                <p className='mb-1'>{company.client_name}Client Name</p>
                <p className='mb-1'>{company.company_address}</p>
                <p className='mb-1'>+61-{company.company_phone}</p>
                <p className='mb-1'>{company.company_email}</p>
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
      </form>
    </div>
  );
};

export default CreateInvoice;
