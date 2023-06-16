import React from 'react';

const InvoiceList = () => {
  const createInvoice = () => {
    console.log('Button is working');
  };
  return (
    <div className='container'>
      <div className='row'>
        <div>List of Invoice</div>
        <div>
          <button onClick={createInvoice}>Create New Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
