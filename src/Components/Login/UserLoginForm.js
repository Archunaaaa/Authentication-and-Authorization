import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation schema
import { loginRequest } from '../../Store/Auth/AuthAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css'; // Import your custom CSS file

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      // passwordVisible: false, // State to manage password visibility
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email or username is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
    }),
    onSubmit: values => {
      dispatch(loginRequest(values));
    },
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    formik.setFieldValue('passwordVisible', !formik.values.passwordVisible);
  };
  
  // Redirect if user is logged in
  if (user) {
    if (user.role === 'USER') {
      navigate('/usertable');
    } else if (user.role === 'ADMIN') {
      navigate('/admintable');
    }
  }

  return (
    <div id="login-form" className="container">
      <h2 className="text-center fw-bold mb-3">Login Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control logininput"
            placeholder="Enter email or username"
            id="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3 password-field">
          <div className="input-group">
            <input
              type={formik.values.passwordVisible ? 'text' : 'password'}
              className="form-control logininput"
              placeholder="Enter password"
              id="password"
              {...formik.getFieldProps('password')}
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="btn-primarys fw-bold">
          Login
        </button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/" className="text-decoration-none">Sign Up</a>
        </p>
        <hr />
      </form>
    </div>
  );
};

export default UserLoginForm;
