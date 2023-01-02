import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
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
