import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { loginRequest } from '../../Store/Auth/AuthAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector(state => state.auth); 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = values => {
    dispatch(loginRequest(values));
  };

  if (user) {
    if (user.role === 'USER') {
      navigate('/usertable');
    } else if (user.role === 'ADMIN') {
      navigate('/admintable');
    }
  }

  return (
    <div id="login-form" className="container mt-5">
      <h2 className="text-center mb-3">Login Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="p" className="text-danger" />
            </div>
            <div className="input-group mb-3">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control password-input"
                placeholder="Password"
              />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
              <ErrorMessage name="password" component="p" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary fw-bold" disabled={isSubmitting}>
              Login
            </button>
            {error && <p className="text-center mt-3 text-danger">{error.message}</p>}
            <p className="text-center mt-3">
              Don't have an account? <a href="/" className="text-decoration-none">Sign Up</a>
            </p>
            <hr />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserLoginForm;
