import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { ...formData };
    dispatch(login(userData));
  };
  return (
    <div className='container col-sm-4'>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <label for='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            class='form-control'
            id='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            placeholder='Enter email'
          />
          <small id='emailHelp' class='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class='form-group'>
          <label for='exampleInputPassword1'>Password</label>
          <input
            type='password'
            class='form-control'
            id='exampleInputPassword1'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            placeholder='Password'
          />
        </div>

        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
      </form>
      <div />
    </div>
  );
};

export default Login;
