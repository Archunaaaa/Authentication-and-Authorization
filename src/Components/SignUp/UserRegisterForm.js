import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupRequest, signupFailure } from '../../Store/Auth/AuthAction';
import { ReusableInput, RoleSelector } from '../../Reuseable/InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

const UserRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.auth || {});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  useEffect(() => {
    if (message === 'User registered successfully!') {
      navigate('/login');
    }
  }, [message, navigate]);

  return (
    <div id="signup-form" className="containers top">
      <h2 className="text-center mb-3">SignUp Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3 form-group">
              <ReusableInput
                type="text"
                name="userName"
                placeholder="Username"
                
              />             
            </div>
            <div className="mb-3 form-group">
              <ReusableInput
                type="email"
                name="email"
                placeholder="Email"              
              />
            </div>
            <div className="mb-3 form-group">
              <ReusableInput
                type="text"
                name="mobileNo"
                placeholder="Mobile Number"
              />
            </div>
            <div className="input-group mb-3 form-group">
              <ReusableInput
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create password"
                icon={showPassword ? faEye : faEyeSlash}
                onIconClick={togglePasswordVisibility}
              />
            </div>
            <div className="input-group mb-3 form-group">
              <ReusableInput
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                icon={showConfirmPassword ? faEye : faEyeSlash}
                onIconClick={toggleConfirmPasswordVisibility}
              />
            </div>
            <div className="input-group mb-3 form-control">
              <RoleSelector
                as="select"
                name="userRole"                          
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </RoleSelector>
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
    </div>
  );
};

export default UserRegisterForm;
