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
  const { error, message } = useSelector((state) => state.auth);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  useEffect(() => {
    if (message === 'Login successful!') {
      const userRole = localStorage.getItem('userRole');
      navigate(userRole === 'USER' ? '/usertable' : '/admintable');
    }
  }, [message, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Dispatch login action
      await dispatch(loginUser(values));

      // If login successful, redirect based on user role
      const userRole = localStorage.getItem('userRole');
      navigate(userRole === 'USER' ? '/usertable' : '/admintable');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setSubmitting(false);
    }
  };

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
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
};

export default UserLoginForm;
