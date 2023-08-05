import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/api/';

const UpdateCompany = () => {
  const [formData, setFormData] = useState({
    company_logo: '',
    company_name: '',
    company_description: '',
    company_address: '',
    company_abn: '',
    company_phone: '',
    company_bsb: '',
    company_accNo: '',
  });
  const dataForm = {
    company_logo: '',
    company_name: '',
    company_description: '',
    company_address: '',
    company_abn: '',
    company_phone: '',
    company_bsb: '',
    company_accNo: '',
  };

  const getCompDetails = async () => {
    try {
      const fetchData = await axios.get(API_URL + 'register_company');
      setFormData(fetchData.data);
      console.log(fetchData.data);
      if (fetchData.data.companies.length == 0) {
        console.log('Nothing Here');
        await axios.post(API_URL + 'register_company', dataForm);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompDetails();
  }, []);

  const onChange = (e, index) => {
    const updatedCompanies = [...formData.companies];
    // console.log(updatedCompanies);
    updatedCompanies[index] = {
      ...updatedCompanies[index],
      [e.target.name]: e.target.value,
    };
    setFormData({ ...formData, companies: updatedCompanies });
  };

  //   const onChange = (e, index) =>
  //     setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + 'register_company',
        formData.companies[0]
      );
      if (response.status == 200) {
        toast.success('Company Updated');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Data Provided');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={(e) => onSubmit(e)}>
        {formData.companies &&
          formData.companies.map((data, index) => (
            <div key={index}>
              <div class='form-group'>
                <label for='company_logo'>Company Logo URL</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_logo'
                  name='company_logo'
                  value={data.company_logo}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Link to company logo'
                />
              </div>
              <div class='form-group'>
                <label for='company_name'>Company Name</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_name'
                  name='company_name'
                  value={data.company_name}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Company Name Pty Ltd'
                />
              </div>

              <div class='form-group'>
                <label for='company_description'>Company Description</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_description'
                  name='company_description'
                  value={data.company_description}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Company Description'
                />
              </div>

              <div class='form-group'>
                <label for='company_address'>Company Address</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_address'
                  name='company_address'
                  value={data.company_address}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Company Address'
                />
              </div>
              <div class='form-group'>
                <label for='company_abn'>Company ABN</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_abn'
                  name='company_abn'
                  value={data.company_abn}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Company ABN'
                />
              </div>

              <div class='form-group'>
                <label for='company_phone'>Company Phone</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_phone'
                  name='company_phone'
                  value={data.company_phone}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Company Phone'
                />
              </div>

              <div class='form-group'>
                <label for='company_bsb'>Account BSB</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_bsb'
                  name='company_bsb'
                  value={data.company_bsb}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Account BSB No.'
                />
              </div>

              <div class='form-group'>
                <label for='company_accNo'>Company Account No.</label>
                <input
                  type='text'
                  class='form-control'
                  id='company_accNo'
                  name='company_accNo'
                  value={data.company_accNo}
                  onChange={(e) => onChange(e, index)}
                  placeholder='Company Account No.'
                />
              </div>
            </div>
          ))}

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
    </div>
  );
};

export default UpdateCompany;
