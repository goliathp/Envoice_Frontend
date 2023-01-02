import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CreateInvoice from './components/layout/CreateInvoice';
import CreateCSV from './components/layout/CreateCSV';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/layout/Register';
import Login from './components/layout/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './features/auth/authSlice';
import PrivateRoute from './components/routes/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Protected and Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/create_csv' element={<CreateCSV />} />
        </Route>

        <Route exact path='/' element={<Landing />} />
        <Route path='/register_user' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/create_invoice' element={<CreateInvoice />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
