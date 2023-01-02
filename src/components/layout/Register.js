import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const { email, password, password2 } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password do not match!');
    } else {
      const userData = { email, password };
      dispatch(register(userData));
    }
  };

  return (
    <>
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
        <div class='form-group'>
          <label for='exampleInputPassword1'>Verify Password</label>
          <input
            type='password'
            class='form-control'
            id='exampleInputPassword1'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            placeholder='Re-type Password'
          />
        </div>
        {/* <div class='form-group form-check'>
          <input type='checkbox' class='form-check-input' id='exampleCheck1' />
          <label class='form-check-label' for='exampleCheck1'>
            Check me out
          </label>
        </div> */}
        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
