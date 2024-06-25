import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { registerRequest, registerSuccess, registerFailure } from '../../Store/Auth/AuthSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

const UserRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.message);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (message === 'User registered successfully!') {
      navigate('/login');
    }
  }, [message, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNo: '',
    userRole: '',
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    mobileNo: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    userRole: Yup.string().required('Role is required'),
  });

  const handleSignupSubmit = async (values) => {
    dispatch(registerRequest());

    try {
      const response = await axios.post('http://localhost:8080/api/auth/user/register', values);
      dispatch(registerSuccess('User registered successfully!'));
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        dispatch(registerFailure(`Error: ${error.response.data.message}`));
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        dispatch(registerFailure('Error: No response received from server.'));
        console.error('No response received from server:', error.request);
      } else {
        dispatch(registerFailure('Error: Something went wrong while sending the request.'));
        console.error('Error during request setup:', error.message);
      }
    }
  };

  return (
    <div id="signup-form" className="container">
      <h2 className="text-center mb-3">SignUp Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignupSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="mb-3">
              <Field
                type="text"
                name="userName"
                className="form-control"
                placeholder="Username"
                value={values.userName}
                onChange={handleChange}
              />
              <ErrorMessage name="userName" component="p" className="text-danger" />
            </div>
            <div className="mb-3">
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email" component="p" className="text-danger" />
            </div>
            <div className="mb-3">
              <Field
                type="number"
                name="mobileNo"
                className="form-control"
                placeholder="Mobile Number"
                value={values.mobileNo}
                onChange={handleChange}
              />
              <ErrorMessage name="mobileNo" component="p" className="text-danger" />
            </div>
            <div className="input-group mb-3">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control password-input"
                placeholder="Create password"
                value={values.password}
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              <ErrorMessage name="password" component="p" className="text-danger" />
            </div>
            <div className="input-group mb-3">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-control password-input"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              <ErrorMessage name="confirmPassword" component="p" className="text-danger" />
            </div>
            <div className="mb-3">
              <Field
                as="select"
                name="userRole"
                className="form-control"
                value={values.userRole}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
              <ErrorMessage name="userRole" component="p" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary fw-bold">Create Account</button>
            <p className="text-center mt-3">
              Clicking <strong>Create Account</strong> means that you agree to
              our <a href="#" className="text-decoration">terms of service</a>.
              <a className="m-5 text-decoration" href="/login">Existing User? Login</a>
            </p>
            <hr />
          </Form>
        )}
      </Formik>
      {message && <p className="text-center mt-3">{message}</p>}
      {error && <p className="text-center mt-3 text-danger">{error}</p>}
    </div>
  );
};

export default UserRegisterForm;
