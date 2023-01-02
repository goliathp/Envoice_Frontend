import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { create_csv, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

const CreateCSV = () => {
  const [formData, setFormData] = useState({
    contractorAccNo: '101601',
    eventRef: '',
    invNo: '',
    invDate: '',
    invAmount: '',
    lbrAmount: '',
    partsAmount: '',
    invComment: '',
  });

  const {
    contractorAccNo,
    eventRef,
    invNo,
    invDate,
    invAmount,
    lbrAmount,
    partsAmount,
    invComment,
  } = formData;

  const { isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate('/');
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (contractorAccNo && eventRef && invNo && invDate && invAmount) {
      const csvData = { ...formData };
      dispatch(create_csv(csvData));
    } else {
      toast.error('Missing fields');
    }
    // const csvData = { ...formData };
    // dispatch(create_csv(csvData));
    // navigate('/');
    // try {
    //   const config = {
    //     headers: { 'Content-Type': 'application/json' },
    //   };
    //   const body = JSON.stringify(formData);
    //   const res = await axios.post(
    //     'http://localhost:2000/api/create_csv',
    //     body,
    //     config
    //   );
    // } catch (error) {
    //   console.error(error.response.data);
    // }
  };

  return (
    <Fragment>
      <div className='container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class='form-group'>
            <label for=''>Contractor Account No.</label>
            <input
              type='accNo'
              name='contractorAccNo'
              value={contractorAccNo}
              onChange={(e) => onChange(e)}
              class='form-control'
              readOnly
            />
            <small id='' class='form-text text-muted'>
              This is the unique number provided to the vendor by Hungry Jack's
            </small>
          </div>

          <div class='form-group'>
            <label for=''>Event Reference</label>
            <input
              type='eventRef'
              name='eventRef'
              value={eventRef}
              onChange={(e) => onChange(e)}
              class='form-control'
            />
            <small id='' class='form-text text-muted'>
              This is the RAMP work order number for the job
            </small>
          </div>

          <div class='form-group'>
            <label for=''>Invoice No.</label>
            <input
              type='invNo'
              name='invNo'
              value={invNo}
              onChange={(e) => onChange(e)}
              class='form-control'
            />
          </div>

          <div class='form-group'>
            <label for=''>Invoice Date</label>
            <input
              type='invDate'
              name='invDate'
              value={invDate}
              onChange={(e) => onChange(e)}
              class='form-control'
            />
            <small id='' class='form-text text-muted'>
              Date Format: YYYYMMDD
            </small>
          </div>

          <div class='form-group'>
            <label for=''>Invoice Amount</label>
            <input
              type='invAmount'
              name='invAmount'
              value={invAmount}
              onChange={(e) => onChange(e)}
              class='form-control'
            />
            <small id='' class='form-text text-muted'>
              Excluding GST Total up to 2 decimal places
            </small>
          </div>

          <div class='form-group'>
            <label for=''>Labour Amount</label>
            <input
              type='lbrAmount'
              name='lbrAmount'
              value={lbrAmount}
              onChange={(e) => onChange(e)}
              class='form-control'
            />
            <small id='' class='form-text text-muted'>
              Excluding GST up to 2 decimal places
            </small>
          </div>

          <div class='form-group'>
            <label for=''>Parts Amount</label>
            <input
              type='partsAmount'
              name='partsAmount'
              value={partsAmount}
              onChange={(e) => onChange(e)}
              class='form-control'
            />
            <small id='' class='form-text text-muted'>
              Excluding GST up to 2 decimal places
            </small>
          </div>

          <div class='form-group'>
            <label for=''>Comments</label>
            <textarea
              class='form-control'
              name='invComment'
              value={invComment}
              onChange={(e) => onChange(e)}
              rows='3'
            />
          </div>

          {/* <div class='form-group form-check'>
            <input
              type='checkbox'
              class='form-check-input'
              id='exampleCheck1'
            />
            <label class='form-check-label' for='exampleCheck1'>
              Check me out
            </label>
          </div> */}
          <button type='submit' class='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateCSV;
