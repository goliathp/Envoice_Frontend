import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { clearInvoice } from '../../features/invoice/invSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(clearInvoice());
    navigate('/');
  };

  return (
    <nav class='navbar navbar-expand-lg navbar-light bg-light'>
      <a class='navbar-brand' href='#'>
        Navbar
      </a>
      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarNav'>
        <ul class='navbar-nav'>
          <li class='nav-item active'>
            <Link to='/' class='nav-link'>
              Home <span class='sr-only'>(current)</span>
            </Link>
          </li>
          {user ? (
            <>
              <li class='nav-item'>
                <Link to='/create_csv' class='nav-link'>
                  Create CSV
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/create_invoice' class='nav-link'>
                  Create Invoice
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/list_invoices' class='nav-link'>
                  List Invoices
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/create_quote' class='nav-link'>
                  Create Quote
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/register_company' class='nav-link'>
                  Register/Update Company
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/add_clients' class='nav-link'>
                  Add Clients
                </Link>
              </li>
              <button class='btn btn-danger' onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li class='nav-item'>
                <Link to='/register_user' class='nav-link'>
                  Register
                </Link>
              </li>
              <li class='nav-item'>
                <Link to='/login' class='btn btn-primary'>
                  Login
                </Link>
              </li>
            </>
          )}

          {/* <li class='nav-item'>
            <a class='nav-link' href='#'>
              Pricing
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
