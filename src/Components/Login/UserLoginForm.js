import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../Store/Auth/AuthSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const UserLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const { message, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message === 'Login successful!' && user && user.role) {
      if (user.role === 'user') {
        navigate('/usertable');
      } else if (user.role === 'admin') {
        navigate('/admintable');
      }
    }
  }, [message, user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <div id="login-form" className="container mt-5">
      <h2 className="text-center mb-3">Login Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="mb-3">
              <Field
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
              />
              <ErrorMessage name="username" component="p" className="text-danger" />
            </div>
            <div className="input-group mb-3">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control password-input"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              <ErrorMessage name="password" component="p" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primarys fw-bold">
              Login
            </button>
            <p className="text-center mt-3">
              Don't have an account? <a href="/" className="text-decoration-none">Sign Up</a>
            </p>
            <hr />
          </Form>
        )}
      </Formik>
      {message && <p className="text-center mt-3">{message}</p>}
      {error && <p className="text-center mt-3 text-danger">{error.message || 'Login failed. Please try again.'}</p>}
    </div>
  );
};

export default UserLoginForm;
