import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { signupRequest, signupFailure } from '../../Store/Auth/AuthAction';
import { ReusableInput, RoleSelector } from '../../Reuseable/InputField';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserRegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state);
  const { errors } = useSelector((state) => state);
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
    userName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    userRole: Yup.string().required('Role is required'),
  });
  

  const handleSignupSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(signupRequest(values));
    } catch (errors) {
      dispatch(signupFailure(errors.message || 'Signup failed'));
    }
    setErrors(errors);
    setSubmitting(false);
  };

  useEffect(() => {
    if (message === 'User registered successfully!') {
      navigate('/login');
    }
  }, [message, navigate]);

  return (
    <div id="signup-form" className="containers top">
        <h2 className="text-center fw-bold mb-3">Register Form </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignupSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div>        
              <div className="mb-3 form-group">
                  <ReusableInput
                    type="text"
                    name="userName"
                    placeholder="Enter your full name"
                    error={errors.userName}
                    touched={touched.userName}
                  />
                </div>
                <div className="mb-3 form-group">
                  <ReusableInput
                    type="email"
                    name="email"
                    placeholder="Enter your email"                 
                    error={errors.email}
                    touched={touched.email}
                  />
                </div>
                <div className=" form-group">
                  <ReusableInput
                    type="password"
                    name="password"
                    placeholder="Create password"
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    error={errors.password}
                    touched={touched.password}
                  />
                </div>
                <div className="form-group">
                  <ReusableInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    showPassword={showConfirmPassword}
                    togglePasswordVisibility={toggleConfirmPasswordVisibility}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                </div>
                <div className="mb-3 form-group">
                 <ReusableInput
                      type="tel"
                      name="mobileNo"
                      placeholder="Enter your mobile number"
                      error={errors.mobileNo}
                      touched={touched.mobileNo}
                      />
                   </div>

                <div className="mb-3 form-group">
                  <RoleSelector
                    name="userRole"
                    error={errors.userRole}
                    touched={touched.userRole}
                  />
                </div>
                
              <button type="submit" className="btn-primary fw-bold" >
               Create Account
             </button>
             <p className="text-center mt-3">
               Clicking <strong>Create Account</strong> means that you agree to
               our <a href="#" className="text-decoration">terms of service</a>.
               <a className="text-decoration" href="/login">Existing User? Login</a>
             </p>
              
                <hr />
                </div>
            </Form>
          )}
        </Formik>
      </div>
  );
};

export default UserRegisterForm;